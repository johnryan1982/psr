/*globals describe:false,it:false*/
var assert = require('../src/utils/assert.js'),

  /// libs
  userlib = require('../src/js/user.js'),

  /// lib APIs
  user = userlib.user;

describe('userlib', function() {
  describe('#userlib API', function() {
    /// static, immutable properties
    it('has a static "user" factory function', function() {
      userlib.user = false;
      assert.isFunction(userlib.user,
        'expecting "userlib.user" to be a function; received "' + userlib.user + '"');
    });
  });

  describe('#factory method object construction', function() {
    it('handles empty/incorrect input "opts"', function() {
      var testcases = [
        undefined,
        null,
        {},
        [],
        'string',
        4,
        Number.NaN,
        false,
        function() { return true; }
      ],
      i,
      testsLen = testcases.length;

      for (i = 0; i < testsLen; i += 1) {
        fnNoThrow(testcases[i], user, 'userlib');
      }

      assert.equal(user({}).name, 'Mr. Green', 'expecting "player.name" to default to \'Mr. Green\'');
    });

    it('creates a user from "opts"', function() {
      var name = 'Jack',
        u = user({ name: name });

      assert.equal(u.name, name, 'expecting "user.name" to be "' + name + '"');
    });
  });

  describe('#user property setters', function() {
    it('set "name"', function() {
      var name = 'Jack',
        newName = ' Jill ',
        u = user({ name: name });

      u.name = '';
      assert.equal(u.name, name, 'expecting "user.name = \'\'" to be ignored');

      u.name = newName;
      assert.equal(u.name, newName.trim(), 'expecting "user.name = ..." to update property');
    });
  });
});

function fnNoThrow(testcase, apiFn, lib) {
  var errMsg = 'expecting "' + [lib, apiFn.name].join('.') + '(' + JSON.stringify(testcase) +
    ')" not to fail';

  assert.doesNotThrow(function() {
    return apiFn(testcase);
  }, Error, errMsg);
}
