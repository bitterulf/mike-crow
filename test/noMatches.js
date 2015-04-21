var Mike = require('../lib/index.js').create;

var assert = require("assert");

describe('Mike', function(){
  var m;
  describe('#act()', function(){
    before(function() {
      m = Mike();
    });
    it('should throw an error if no commands exist at all', function(done){
      m.act({}, function(err, result) {
        assert.equal(err.message, 'no commands at all');
        done();
      });
    });
    it('should throw an error if no commands match the request', function(done){
      m.add({cmd: 'something'}, function(data, cb) {
        cb(null, data);
      });
      m.act({}, function(err, result) {
        assert.equal(err.message, 'no match found');
        done();
      });
    });
  });
});
