# Mike Crow

Mike Crow is a Micro-Service toolkit for Node.js and the Browser.
It is my rewrite of the concept behind seneca to split business logic into small changeable chunks of functionality.
Unlike seneca mike does not care about scaling in the hardware sense but helps you to keep things organized and flexible.

So if you want to use Mike on the server side be sure to checkout seneca first.
If you already worked with seneca and you want something similar on the browser you can keep mostly the same coding style.
If you are new to the whole idea about splitting your app into dozens of small microservices just try it out.

I have written some tests to ensure most parts are working but if you find some strange behavior please create an issue.

Examples will follow the next days.

## Installation

via npm:

```bash
$ npm install mike-crow
```


## Examples

### Node.js

```javascript
var mc = require('mike-crow').create();

mc.add( {cmd:'salestax'}, function(args,callback){
  var rate  = 0.23
  var total = args.net * (1+rate)
  callback(null,{total:total})
});

mc.act( {cmd:'salestax', net:100}, function(err,result){
  console.log( result.total )
});
```

### Browser

Look into the browser/example folder.

## License

MIT
