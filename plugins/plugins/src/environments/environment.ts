// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  publicVapidKey:
  'BP4HNtKjB1OT54fs5sojoqzPj4IS4vmleEmcdqjNdnK0UMBXHRKzLKTSs_ns47Cc4050i5liPmRjG-QARrmbz9o',
  functions: {
    notificationsHttp:
      'https://us-central1-project-12332.cloudfunctions.net/notifications',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
