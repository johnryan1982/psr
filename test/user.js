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
      it('#has a static "user" factory function', function() {
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
      it('#handles empty/incorrect input "opts"', function() {
        var opts, optsLen, i;

        opts = [
          undefined, null, {}, [], 'string', 4, Number.NaN, false, function() { return true; }
        ];
        optsLen = opts.length;

        for (i = 0; i < optsLen; i += 1) {
          utils.shouldNotThrow(opts[i], user, 'userlib');
        }

        assert.equal(user({}).name, 'Mr. Green', 'expecting "player.name" to default to \'Mr. Green\'');
      });

      it('#return a (userObj) object from "opts"', function() {
        var name, userObj;

        name = 'Jack';
        userObj = user({
          name: name
        });
        assert.equal(userObj.name, name, 'expecting "userObj.name" to be "' + name + '"');
      });
    });

    describe('#userObj property setters', function() {
      it('#name=', function() {
        var name, newName, userObj;

        name = 'Jack';
        newName = ' Jill ';
        userObj = user({
          name: name
        });

        userObj.name = '';
        assert.equal(userObj.name, name, 'expecting "userObj.name = \'\'" to be ignored');

        userObj.name = newName;
        assert.equal(userObj.name, newName.trim(), 'expecting "userObj.name = ..." to update property');
      });
    });
  });
}());
