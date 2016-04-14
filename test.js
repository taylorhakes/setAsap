var setAsap = require('../setAsap');
var painless = require('painless');
var assert = painless.assert;
var test = painless.createGroup();

test('Is async', function(done) {
	var async = false;
	setAsap(function() {
		assert.equal(async, true);
		done();
	});
	async = true;
});
test('Multiple calls at the same time', function(done) {
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
test('Calls in order', function(done) {
	var async1 = false;
	setAsap(function() {
		setAsap(function() {
			assert.equal(async1, true);
			done();
		});
	});
	async1 = true;
});

