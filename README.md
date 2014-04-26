setAsap [![Build Status](https://travis-ci.org/taylorhakes/setAsap.png?branch=master)](https://travis-ci.org/taylorhakes/setAsap)
====

setImmediate polyfill for the browser and node. It has unmatched performance and is extremely lightweight.

```
setAsap(function() {
	// do something async
});
```

#### Note
Currently, there is no way to cancel setAsap. The code base is much smaller without it.