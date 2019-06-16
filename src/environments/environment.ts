// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDIdS3XaXBPJvyNCHudRtG99BvW--bOJGQ',
    authDomain: 'torah-academy.firebaseapp.com',
    databaseURL: 'https://torah-academy.firebaseio.com',
    projectId: 'torah-academy',
    storageBucket: 'torah-academy.appspot.com',
    messagingSenderId: '283340384588'
  }
};
