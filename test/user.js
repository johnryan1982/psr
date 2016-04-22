/*globals describe:false,it:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    userlib = require('../src/js/user.js'),

    /// lib APIs
    user = userlib.user;

  describe('userlib', function() {
    describe('#userlib API', function() {
      /// static, immutable properties
      it('has a static "user" factory function', function() {
        assert.throws(
          function() {
            userlib.user = 'a';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "userlib.user" should throw an error'
        );
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
          utils.shouldNotThrow(testcases[i], user, 'userlib');
        }

        assert.equal(user({}).name, 'Mr. Green', 'expecting "player.name" to default to \'Mr. Green\'');
      });

      it('creates a user from "opts"', function() {
        var name = 'Jack',
          u = user({
            name: name
          });

        assert.equal(u.name, name, 'expecting "user.name" to be "' + name + '"');
      });
    });

    describe('#user property setters', function() {
      it('set "name"', function() {
        var name = 'Jack',
          newName = ' Jill ',
          u = user({
            name: name
          });

        u.name = '';
        assert.equal(u.name, name, 'expecting "user.name = \'\'" to be ignored');

        u.name = newName;
        assert.equal(u.name, newName.trim(), 'expecting "user.name = ..." to update property');
      });
    });
  });
}());
