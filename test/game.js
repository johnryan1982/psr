/*globals describe:false,it:false*/
var assert = require('../src/utils/assert.js'),

  /// libs
  gamelib = require('../src/js/game.js'),

  /// lib APIs
  game = gamelib.game,

  /// other
  immutableTypeErrorRegExp = /(read([- ]?)only|Object doesn\'t support this action)/;

describe('gamelib', function() {
  describe('#gamelib API', function() {
    /// static, immutable properties
    it('has a static "game" factory function', function() {
      gamelib.game = false;
      assert.isFunction(gamelib.game,
        'expecting "gamelib.game" to be a function; received "' + gamelib.game + '"');
    });

    it('has a static, immutable "modeCC" (computer-vs-computer) property', function() {
      gamelib.modeCC = 'a';
      assert.equal(gamelib.modeCC, 'cc',
        'expecting "gamelib.modeCC" to be "cc"; received "' + gamelib.modeCC + '"');
    });

    it('has a static, immutable "modePC" (player-vs-computer) property', function() {
      gamelib.modePC = 'a';
      assert.equal(gamelib.modePC, 'pc',
        'expecting "gamelib.modePC" to be "pc"');
    });

    it('has a static, immutable "modes" property', function() {
      var expected = ['cc', 'pc'];
      assert.deepEqual(gamelib.modes, expected,
        'expecting "gamelib.modes" to be ' + JSON.stringify(expected));

      assert.throws(
        function() {
          gamelib.modes.push('a');
        },
        TypeError,
        immutableTypeErrorRegExp,
        'attempting to modify "modes" should throw an error'
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
        true,
        false,
        function() { return true; }
      ],
      i,
      testsLen = testcases.length;

      for (i = 0; i < testsLen; i += 1) {
        fnNoThrow(testcases[i], game, 'gamelib');
      }
    });

    it('returns an object with a "mode" property', function() {
      var ccGame = game(),
        pcGame = game({ mode: 'pc' }),
        defaultGame = game({ mode: 'X' });

      assert.property(ccGame, 'mode');

      assert.equal(ccGame.mode, 'cc', 'expecting "game.mode" value to default to "modeCC"; ' +
        ' received "' + ccGame.mode + '"');
      assert.equal(pcGame.mode, 'pc', 'expecting "game.mode" value to be "modePC"; ' +
        ' received "' + pcGame.mode + '"');
      assert.equal(defaultGame.mode, 'cc', 'expecting "game.mode" value to be "modeCC"; ' +
        ' received "' + pcGame.mode + '"');
    });

    it('returns an object with an immutable "players" property', function() {
      var ccGame = game();
      assert.deepEqual(ccGame.players, ['a', 'b']);

      assert.throws(
        function() {
          ccGame.players.push('c');
        },
        TypeError,
        immutableTypeErrorRegExp,
        'attempting to modify "players" should throw an error'
      );
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
