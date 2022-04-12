// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'boomclub-tfg',
    appId: '1:197049353515:web:db456ab5f40683567e716e',
    storageBucket: 'boomclub-tfg.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyDMZfih4uPeMMBJpywPGwI-SRCKsih0J7g',
    authDomain: 'boomclub-tfg.firebaseapp.com',
    messagingSenderId: '197049353515',
    measurementId: 'G-3SQXR6XPGV',
  },
  production: false,
  backUrl: "http://localhost:8080/base",
  apiUrl: "http://localhost:8080/base/api/v1"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
