module.exports = {
  packagerConfig: {
    asar: true,
    osxSign: {
      identity: 'Foo',
      identityValidation: false,
      optionsForFile: (filePath) => {
        return {
          hardenedRuntime: false,
        };
      }
    },
    appBundleId: 'org.example.nuts',
    ignore: [
      '/conveyor.conf$',
      '/output($|/)',
      '\\.zip$',
      '\\.tgz$',
      '\\.p12$',
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './windows.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD        
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'leo-hydraulic',
          name: 'nuts'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
};
