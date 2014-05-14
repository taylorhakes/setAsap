(function (main, undefined) {
	'use strict';
	var setAsap = (function () {
		var callbacks = [], timeout, hiddenDiv, scriptEl, timeoutFn;
		// Modern browsers, fastest async
		if (main.MutationObserver) {
			hiddenDiv = document.createElement("div");
			(new MutationObserver(executeCallbacks)).observe(hiddenDiv, { attributes: true });
			return function (callback) {
				if (!callbacks.length) {
					hiddenDiv.setAttribute('yes', 'no');
				}
				callbacks.push(callback);
			};
		// Browsers that support postMessage
		} else if (!main.setImmediate && main.postMessage && !main.importScripts && main.addEventListener) {
			var MESSAGE_PREFIX = "com.setImmediate" + Math.random(), hasPostMessage = false;

			var onGlobalMessage = function (event) {
				if (event.source === main && event.data === MESSAGE_PREFIX) {
					hasPostMessage = false;
					executeCallbacks();
				}
			};

			main.addEventListener("message", onGlobalMessage, false);

			return function (fn) {
				callbacks.push(fn);

				if (!hasPostMessage) {
					hasPostMessage = true;
					main.postMessage(MESSAGE_PREFIX, "*");
				}
			};
		// IE browsers without postMessage
		} else if (!main.setImmediate && main.document && 'onreadystatechange' in document.createElement('script')) {
			return function (callback) {
				callbacks.push(callback);
				if (!scriptEl) {
					scriptEl = document.createElement("script");
					scriptEl.onreadystatechange = function () {
						scriptEl.onreadystatechange = null;
						scriptEl.parentNode.removeChild(scriptEl);
						scriptEl = null;
						executeCallbacks();
					};
					document.body.appendChild(scriptEl);
				}
			};
		// All other browsers and node
		} else {
			timeoutFn = main.setImmediate || (main.process && main.process.nextTick) || setTimeout;
			return function (callback) {
				callbacks.push(callback);
				if (!timeout) {
					timeout = timeoutFn(function () {
						timeout = undefined;
						executeCallbacks();
					}, 0);
				}
			};
		}

		function executeCallbacks() {
			var cbList = callbacks;
			callbacks = [];
			for (var i = 0, len = cbList.length; i < len; i++) {
				cbList[i]();
			}
		}
	})();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = setAsap;
	} else if (typeof require !== 'undefined' && require.amd) {
		define(function () {
			return setAsap;
		});
	} else {
		main.setAsap = setAsap;
	}

})(this);
