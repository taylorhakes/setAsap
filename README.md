setAsap [![Build Status](https://travis-ci.org/taylorhakes/setAsap.png?branch=master)](https://travis-ci.org/taylorhakes/setAsap)
====

setImmediate polyfill for the browser and node. This is an alternative to `setTimeout(fn, 0)`, which behaves like `setTimeout(fn, 4)`. setAsap will execute immediately. It has unmatched performance and is extremely lightweight.
### Install
```
npm install setasap --save
```


### Use
```
setAsap(function() {
  // do something async
});
```

#### Note
Currently, there is no way to cancel setAsap. The code base is much smaller without it.