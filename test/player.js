/*globals describe:false,it:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    playerlib = require('../src/js/player.js'),

    /// lib APIs
    player = playerlib.player;

  describe('playerlib', function() {
    describe('#playerlib API', function() {
      /// static, immutable properties
      it('has a static "player" factory function', function() {
        assert.throws(
          function() {
            playerlib.player = 'a';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "playerlib.player" should throw an error'
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
          fnNoThrow(testcases[i], player, 'playerlib');
        }

        assert.equal(player({}).name, 'Prof. Plum', 'expecting "player.name" to default to \'Prof. Plum\'');
      });

      it('creates a player from "opts"', function() {
        var name = 'Bill',
          p = player({ name: name });

        assert.equal(p.name, name, 'expecting "player.name" to be "' + name + '"');
      });
    });

    describe('#player property setters', function() {
      it('set "name"', function() {
        var name = 'Bill',
          newName = ' Ben ',
          p = player({ name: name });

        p.name = '';
        assert.equal(p.name, name, 'expecting "player.name = \'\'" to be ignored');

        p.name = newName;
        assert.equal(p.name, newName.trim(), 'expecting "player.name = ..." to update property');
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
}());
