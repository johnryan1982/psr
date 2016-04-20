/*globals describe:false,it:false*/
var assert = require('../src/js/assert.js'),

  /// libs
  playerlib = require('../src/js/player.js'),

  /// lib APIs
  player = playerlib.player;

describe('playerlib', function() {
  describe('#playerlib API', function() {
    /// static, immutable properties
    it('has a static "player" factory function', function() {
      playerlib.player = false;
      assert.isFunction(playerlib.player,
        'expecting "playerlib.player" to be a function; received "' + playerlib.player + '"');
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
        true,
        false,
        function() { return true; }
      ],
      i,
      testsLen = testcases.length;

      for (i = 0; i < testsLen; i += 1) {
        fnNoThrow(testcases[i], player, 'playerlib');
      }
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
