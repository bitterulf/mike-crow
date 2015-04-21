var Mike = require('../lib/index.js').create;

var assert = require("assert");

describe('Mike', function(){
  var m;
  describe('#act()', function(){
    before(function() {
      m = Mike();
    });
    it('should choose the command with the most matching pattern elements', function(done){
      m.add({a: '*', b: '*', c: '*'}, function(data, cb) {
        data.patternElements = 3;
        cb(null, data);
      });
      m.add({d: '*', e: '*'}, function(data, cb) {
        data.patternElements = 2;
        cb(null, data);
      });
      m.act({a: 'a', b: 'b', c: 'c', d: 'd', e: 'e'}, function(err, result) {
        assert.equal(result.patternElements, 3);
        done();
      });
    });
    it('should choose the command with in alphabetical order of the element keys if maching pattern elements are the same', function(done){
      m.add({d: '*', e: '*', f: '*'}, function(data, cb) {
        cb(null, data);
      });
      m.add({a: '*', b: '*', c: '*'}, function(data, cb) {
        data.alphabetical = true;
        cb(null, data);
      });
      m.act({a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f'}, function(err, result) {
        assert.equal(result.alphabetical, true);
        m.add({d: '*', e: '*', f: '*'}, function(data, cb) {
          cb(null, data);
        });
        m.act({a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f'}, function(err, result) {
          assert.equal(result.alphabetical, true);
          done();
        });
      });
    });
  });
});
