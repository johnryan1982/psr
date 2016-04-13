/*globals require:false,describe:false,it:false*/
var assert = require('../src/js/assert.js'),
  mylib = require('../src/js/main.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('mylib', function() {
  describe('#api.name', function() {
    it('should be "Teresa"', function() {
      assert.equal(mylib.name, 'Teresa');
    });
  });
});
