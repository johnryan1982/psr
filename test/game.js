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
        var opts, optsLen, i, numericOpts, numericOptsLen, j;

        opts = [
          undefined, null, {}, [], 'string', 3, Number.NaN, true, false, function() { return true; }
        ];
        optsLen = opts.length;

        for (i = 0; i < optsLen; i += 1) {
          testGameFactoryInvocation(opts[i]);
        }

        testGameFactoryRoundsInvocation(-1, 1);
        testGameFactoryRoundsInvocation(0, 1);
        testGameFactoryRoundsInvocation(1, 1);

        testGameFactoryRoundsInvocation(-6.458, 7);
        testGameFactoryRoundsInvocation(6.458, 7);

        testGameFactoryRoundsInvocation(1e1, 11);
        testGameFactoryRoundsInvocation(-1e1, 11);

        testGameFactoryRoundsInvocation(Infinity, -1);
        testGameFactoryRoundsInvocation(-Infinity, -1);
      });

      it('returns a (gameObj) object with an immutable "mode" property', function() {
        var gameUndefinedMode, gameComputerVsComputer, gamePlayerVsComputer, gameUnknownConfig;

        gameUndefinedMode = game();
        assert.property(gameUndefinedMode, 'mode');

        gameComputerVsComputer = game({
          mode: 'cc'
        });
        assert.equal(gameComputerVsComputer.mode, 'cc', 'expecting "game.mode" value to default to "modeCC"; ' +
          ' received "' + gameComputerVsComputer.mode + '"');

        gamePlayerVsComputer = game({
          mode: 'pc'
        });
        assert.equal(gamePlayerVsComputer.mode, 'pc', 'expecting "game.mode" value to be "modePC"; ' +
          ' received "' + gamePlayerVsComputer.mode + '"');

        gameUnknownConfig = game({
          mode: 'X'
        });
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

      it('returns a (gameObj) object with an immutable "players" list', function() {
        var gameObj = game();
        assert.deepEqual(gameObj.players, ['a', 'b']);

        assert.throws(
          function() {
            gameObj.players.push('c');
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "players" should throw an error'
        );
      });

      /// * have the following properties:
      ///   * <Map> rounds
      ///     * <int> limit
      ///     * <int> target
      ///     * <int> played
      /// * have the following methods:
      ///   * reset // reset game => reset player stats
      it('returns a (gameObj) object with an immutable "rounds" object', function() {
        var gameObj, defaultRoundsObject;

        gameObj = game();
        assert.throws(
          function() {
            gameObj.rounds.played = 5;
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "rounds" should throw an error'
        );

        defaultRoundsObject = {
          limit: 3,
          target: 2,
          played: 0
        };
        assert.deepEqual(gameObj.rounds, defaultRoundsObject, 'expecting "rounds" to be "' +
          JSON.stringify(defaultRoundsObject) + '"');
      });

      it('"reset" method resets the "rounds" property, plus each "player.score" property');
    });
  });

  function testGameFactoryInvocation(config) {
    var gameObj;

    assert.doesNotThrow(function() {
      gameObj = game(config);
    });
    testGameRoundsProperty(gameObj);

    assert.doesNotThrow(function() {
      gameObj = game({
        rounds: config
      });
    });
    testGameRoundsProperty(gameObj);
  }

  function testGameFactoryRoundsInvocation(config, expectedLimit) {
    var gameObj;

    assert.doesNotThrow(function() {
      gameObj = game({
        rounds: config
      });
    });

    if (Math.abs(config) === Infinity) {
      testInfiniteGameRoundsProperty(gameObj);
    }
    else {
      testGameRoundsProperty(gameObj, expectedLimit);
    }
  }

  function testGameRoundsProperty(gameObj, expectedLimit) {
    var limit, target;

    expectedLimit = expectedLimit || 3;

    limit = gameObj.rounds.limit;
    assert.equal(limit, expectedLimit);

    target = Math.ceil(limit / 2);
    assert.equal(gameObj.rounds.target, target);
  }

  function testInfiniteGameRoundsProperty(gameObj) {
    var limit, target;

    limit = target = -1;
    assert.equal(gameObj.rounds.limit, limit);
    assert.equal(gameObj.rounds.target, target);
  }
}());
