// Karma configuration
// Generated on Sun Apr 03 2016 19:43:23 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha',
      'commonjs'
    ],


    // list of files / patterns to load in the browser
    files: [
      'src/js/**/*.js',
      // 'src/polyfills/**/*.js',
      // 'src/utils/**/*.js',
      'test/*.js',
      'test/utils/**/*.js',

      /// explicitly define vendor scripts
      // 'src/vendor/chai-3.5.0.js'
      'test/vendor/chai-3.5.0.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/js/**/*.js': ['commonjs'],
      // 'src/polyfills/**/*.js': ['commonjs'],
      // 'src/utils/**/*.js': ['commonjs'],
      'test/*.js': ['commonjs'],
      'test/utils/**/*.js': ['commonjs'],

      /// explicitly define vendor scripts
      // 'src/vendor/chai-3.5.0.js': ['commonjs']
      'test/vendor/chai-3.5.0.js': ['commonjs']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: [
    //   'progress'
    // ],
    client: {
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'tdd'
      }
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
