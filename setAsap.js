(function (main, undefined) {
	'use strict';
	var setAsap = (function () {
		var callbacks = [], timeout, hiddenDiv, scriptEl, timeoutFn;
		if (typeof window !== 'undefined') main = window;
		// Modern browsers, fastest async
		if (main.MutationObserver) {
			hiddenDiv = document.createElement("div");
			(new MutationObserver(executeCallbacks)).observe(hiddenDiv, { attributes: true });
			return getAsap(function () {
				hiddenDiv.setAttribute('yes', 'no');
			});
			// Browsers that support postMessage
		} else if (!main.setImmediate && main.postMessage && !main.importScripts && main.addEventListener) {
			var MESSAGE_PREFIX = "com.setImmediate" + Math.random(), hasPostMessage = false;

			var onGlobalMessage = function (event) {
				if (event.source === main && event.data === MESSAGE_PREFIX) {
					executeCallbacks();
				}
			};

			main.addEventListener("message", onGlobalMessage, false);

			return getAsap(function () {
				main.postMessage(MESSAGE_PREFIX, "*");
			});
			// IE browsers without postMessage
		} else if (!main.setImmediate && main.document && 'onreadystatechange' in document.createElement('script')) {
			return getAsap(function () {
				scriptEl = document.createElement("script");
				scriptEl.onreadystatechange = function () {
					scriptEl.onreadystatechange = null;
					scriptEl.parentNode.removeChild(scriptEl);
					scriptEl = null;
					executeCallbacks();
				};
				document.body.appendChild(scriptEl);
			});
			// All other browsers and node
		} else {
			timeoutFn = main.setImmediate || (main.process && main.process.nextTick) || setTimeout;
			return getAsap(function () {
				timeoutFn(function () {
					executeCallbacks();
				}, 0);
			});
		}

		function getAsap(fn) {
			return function (callback) {
				if (!callbacks.length) {
					fn();
				}
				callbacks.push(callback);
			}
		}

		function executeCallbacks() {
			var cbList = callbacks;
			callbacks = [];
			for (var i = 0, len = cbList.length; i < len; i++) {
				tryError(cbList[i]);
			}
		}

		function tryError(fn) {
			try {
				fn();
			} catch(e) {
				setTimeout(function() {
					throw e;
				});
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
