/* jshint node: true */

module.exports = function (environment) {
    var ENV = {
        modulePrefix: 'simple-persisted-form',
        environment: environment,
        firebase: 'https://race-roster-test-1.firebaseio.com/',
        baseURL: '/',
        locationType: 'auto',

        contentSecurityPolicy: {
            'default-src': "'none'",
            'script-src': "'self' *.firebaseio.com",
            'font-src': "'self'",
            'connect-src': "'self' race-roster-test-1.firebaseio.com wss://*.firebaseio.com",
            'img-src': "'self' data: placehold.it",
            'style-src': "'self' 'unsafe-inline'",
            'media-src': "'self'",
            'frame-src': "*.firebaseio.com"
        },

        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
