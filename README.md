# Mike Crow - a Micro-Service toolkit for Node.js and the Browser

Mike Crow

## Installation

via npm:

```bash
$ npm install mike-crow
```


## Example

```javascript
var mc = require('../lib/index.js').create()

mc.add( {cmd:'salestax'}, function(args,callback){
  var rate  = 0.23
  var total = args.net * (1+rate)
  callback(null,{total:total})
});

mc.act( {cmd:'salestax', net:100}, function(err,result){
  console.log( result.total )
});
```



## License

MIT
