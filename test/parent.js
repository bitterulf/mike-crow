var Mike = require('../lib/index.js').create;

var assert = require("assert");

describe('Mike', function(){
  var m;
  describe('#act()', function(){
    before(function() {
      m = Mike();
    });
    it('should provide a undefined parent if it is the only matching command', function(done){
      m.add({cmd: 'something'}, function(data, cb) {
        data.firstExecuted = true;
        data.firstParent = this.parent;
        cb(null, data);
      });
      m.act({cmd: 'something'}, function(err, result) {
        assert.equal(result.firstParent, undefined);
        done();
      });
    });
    it('should provide the parent function if there exist two matching commands', function(done){
      m.add({cmd: 'something'}, function(data, cb) {
        data.secondExecuted = true;
        data.secondParent = this.parent;
        cb(null, data);
      });
      m.act({cmd: 'something'}, function(err, result) {
        assert.equal(result.firstExecuted, undefined);
        assert(result.secondExecuted);
        assert(result.secondParent);
        done();
      });
    });
    it('should provide working parent functions', function(done){
      m.add({cmd: 'something'}, function(data, cb) {
        data.thirdExecuted = true;
        this.parent.call(this, data, function(err, data) {
          cb(null, data);
        });
      });
      m.act({cmd: 'something'}, function(err, result) {
        assert.equal(result.firstExecuted, undefined);
        assert(result.secondExecuted);
        assert(result.thirdExecuted);
        done();
      });
    });
  });
});
