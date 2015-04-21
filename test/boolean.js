var Mike = require('../lib/index.js').create;

var assert = require("assert");

describe('Mike', function(){
  var m;
  describe('#act()', function(){
    before(function() {
      m = Mike();
    });
    it('should work with booleans correctly', function(done){
      m.add({active: true}, function(data, cb) {
        data.active = true;
        cb(null, data);
      });
      m.add({active: false}, function(data, cb) {
        data.active = false;
        cb(null, data);
      });
      m.act({active: true}, function(err, result) {
        assert.equal(result.active, true);
        m.act({active: false}, function(err, result) {
          assert.equal(result.active, false);
          done();
        });
      });
    });
  });
});
