/*globals require:false,describe:false,it:false*/
var assert = require('../src/js/assert.js'),
  mylib = require('../src/js/main.js');

describe('mylib', function() {
  describe('#api.name', function() {
    it('name should be "Teresa"', function() {
      assert.equal(mylib.name, 'Teresa');
    });
  });
});
