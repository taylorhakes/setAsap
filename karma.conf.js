// Karma configuration
// Generated on Sat Apr 26 2014 12:38:28 GMT-0400 (EDT)

module.exports = function (config) {

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		frameworks: ['browserify', 'painless'],


		// list of files / patterns to load in the browser
		files: [
			'test.js'
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test.js': [ 'browserify' ]
		},


		// list of files to exclude
		exclude: [

		],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'/*, 'saucelabs'*/],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['ChromeHeadless']/*Object.keys(customLaunchers)*/,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
