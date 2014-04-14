var asap = (function() {
		var callbacks = [], timeout, hiddenDiv, scriptEl, timeoutFn;
		if(global.MutationObserver) {
			hiddenDiv = document.createElement("div");
			(new MutationObserver(executeCallbacks)).observe(hiddenDiv, { attributes: true });
			return function (callback) {
				if( !callbacks.length) {
					hiddenDiv.setAttribute('yes', 'no');
				}
				callbacks.push(callback);
			};
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
		
		} else  {
			timeoutFn = global.setImmediate || setTimeout;
			return function (callback){
				callbacks.push(callback);
				if(!timeout) {
					timeout = timeoutFn(function() {
					  timeout = void 0;
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
