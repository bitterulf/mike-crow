var Mike = require('../lib/index.js').create;

var assert = require("assert");

describe('Mike', function(){
  var m;
  describe('#act()', function(){
    before(function() {
      m = Mike();
    });
    it('should work with wildcards', function(done){
      m.add({cmd: 'something', target: '*'}, function(data, cb) {
        data.wildcardExecuted = true;
        cb(null, data);
      });
      m.act({cmd: 'something'}, function(err, result) {
        assert.equal(result, undefined);
        m.act({cmd: 'something', target: 'something'}, function(err, result) {
          assert.equal(result.wildcardExecuted, true);
          done();
        });
      });
    });
  });
});
