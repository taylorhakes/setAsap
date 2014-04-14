(function(global, undefined) {
	'use strict';
	var asap = (function() {
		var callbacks = [], timeout, hiddenDiv, scriptEl, timeoutFn;
		// Modern browsers, fastest async
		if(global.MutationObserver) {
			hiddenDiv = document.createElement("div");
			(new MutationObserver(executeCallbacks)).observe(hiddenDiv, { attributes: true });
			return function (callback) {
				if( !callbacks.length) {
					hiddenDiv.setAttribute('yes', 'no');
				}
				callbacks.push(callback);
			};
		// IE browsers without setImmediate
		} else if(!global.setImmediate && global.document && document.onreadystatechange === null) {
			return function(callback) {
				callbacks.push(callback);
				if(!scriptEl) {
					scriptEl = document.createElement("script");
					scriptEl.onreadystatechange = function () {
		    				scriptEl.onreadystatechange = null;
		    				scriptEl.parentNode.removeChild(scriptEl);
		    				scriptEl = null;
		    				executeCallbacks();
					};
					document.body.appendChild(scriptEl);
				}		
			}
		// All other browsers and node
		} else  {
			timeoutFn = global.setImmediate || setTimeout;
			return function (callback){
				callbacks.push(callback);
				if(!timeout) {
					timeout = timeoutFn(function() {
					  timeout = undefined;
					  executeCallbacks();
					}, 0);
				}
			};
		}

		function executeCallbacks() {
			var cbList = callbacks;
			callbacks = [];
			for(var i = 0, len = cbList.length; i < len; i++) {
				cbList[i]();
			}
		}
	})();
	
	if(typeof module !== 'undefined' && module.exports) {
		module.exports = asap;
	} else if (typeof require !== 'undefined' && require.amd) {
		define(function() {
			return asap;
		});
	} else {
		global.asap = asap;
	}
	
})(this, void 0);
