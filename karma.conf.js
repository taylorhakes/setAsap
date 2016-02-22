// Karma configuration
// Generated on Sat Apr 26 2014 12:38:28 GMT-0400 (EDT)

module.exports = function (config) {
	var customLaunchers = {
		sl_chrome: {
			base: 'SauceLabs',
			browserName: 'chrome'
		},
		sl_firefox: {
			base: 'SauceLabs',
			browserName: 'firefox'
		},
		iphone_4: {
			base: 'SauceLabs',
			platform: 'OS X 10.6',
			browserName: 'iphone',
			version: '4'
		},
		sl_opera: {
			base: 'SauceLabs',
			browserName: 'opera'
		},
		sl_ie_9: {
			base: 'SauceLabs',
			browserName: 'internet explorer',
			platform: 'Windows 7',
			version: '9'
		}
	};
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['browserify','mocha'],

		// list of files / patterns to load in the browser
		files: [
			'test/*'
		],

		// list of files to exclude
		exclude: [

		],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test/*': [ 'browserify' ]
		},

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
		browsers: ['PhantomJS']/*Object.keys(customLaunchers)*/,

		customLaunchers: customLaunchers,

		sauceLabs: {
			testName: 'setAsap unit tests'
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
