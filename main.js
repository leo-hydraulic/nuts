if(require('electron-squirrel-startup')) return;
require('update-electron-app')({
  updateInterval: '5 minutes',
});

const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('index.html')
  const version = app.getVersion()
  win.webContents.executeJavaScript(`
    const elem = document.querySelector('#app-version');
    elem.textContent = '${version}';
  `);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
