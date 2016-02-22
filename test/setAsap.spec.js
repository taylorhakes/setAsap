var setAsap = require('../setAsap');
var assert = require('chai').assert;

describe('setAsap', function() {
	it('Is async', function(done) {
		var async = false;
		setAsap(function() {
			assert.equal(async, true);
			done();
		});
		async = true;
	});
	it('Multiple calls at the same time', function(done) {
		var async1 = false,
			async2 = false,
			done1 = false,
			done2 = false;
		setAsap(function() {
			assert.equal(async1, true);
			done1 = true;
			checkDone();
		});

		setAsap(function() {
			assert.equal(async2, true);
			done2 = true;
			checkDone();
		});

		function checkDone() {
			if(done1 && done2) {
				done();
			}
		}
		async1 = true;
		async2 = true;
	});
	it('Calls in order', function(done) {
		var async1 = false;
		setAsap(function() {
			setAsap(function() {
				assert.equal(async1, true);
				done();
			});
		});
		async1 = true;
	});
});

