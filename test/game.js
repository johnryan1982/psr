/*globals describe:false,it:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    gamelib = require('../src/js/game.js'),

    /// lib APIs
    game = gamelib.game;

  describe('gamelib', function() {
    describe('#gamelib API', function() {
      /// static, immutable properties
      it('has a static "game" factory function', function() {
        assert.throws(
          function() {
            gamelib.game = false;
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "gamelib.game" should throw an error'
        );
      });

      it('has a static, immutable "modeCC" (computer-vs-computer) property', function() {
        assert.throws(
          function() {
            gamelib.modeCC = 'a';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "gamelib.modeCC" should throw an error'
        );
      });

      it('has a static, immutable "modePC" (player-vs-computer) property', function() {
        assert.throws(
          function() {
            gamelib.modePC = 'a';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "gamelib.modePC" should throw an error'
        );
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
          utils.immutableTypeErrorRegExp,
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
          false,
          function() { return true; }
        ],
        i,
        testsLen = testcases.length;

        for (i = 0; i < testsLen; i += 1) {
          fnNoThrow(testcases[i], game, 'gamelib');
        }
      });

      it('returns an object with an immutable "mode" property', function() {
        var gameComputerVsComputer = game(),
          gamePlayerVsComputer = game({ mode: 'pc' }),
          gameUnknownConfig = game({ mode: 'X' });

        assert.property(gameComputerVsComputer, 'mode');

        assert.equal(gameComputerVsComputer.mode, 'cc', 'expecting "game.mode" value to default to "modeCC"; ' +
          ' received "' + gameComputerVsComputer.mode + '"');
        assert.equal(gamePlayerVsComputer.mode, 'pc', 'expecting "game.mode" value to be "modePC"; ' +
          ' received "' + gamePlayerVsComputer.mode + '"');
        assert.equal(gameUnknownConfig.mode, 'cc', 'expecting "game.mode" value to be "modeCC"; ' +
          ' received "' + gameUnknownConfig.mode + '"');

        assert.throws(
          function() {
            gameComputerVsComputer.mode = 'a';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "mode" should throw an error'
        );
      });

      it('returns an object with an immutable "players" property', function() {
        var g = game();
        assert.deepEqual(g.players, ['a', 'b']);

        assert.throws(
          function() {
            g.players.push('c');
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
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
}());
