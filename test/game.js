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
        var opts,
          numOpts,
          i,
          j,
          optsLen,
          numOptsLen;

        opts = [
          undefined, null, {}, [], 'string', 4, Number.NaN, false, function() { return true; }
        ];
        optsLen = opts.length;

        for (i = 0; i < optsLen; i += 1) {
          incorrectGameFactoryInvocation(opts[i]);
        }

        numOpts = [
          -1, 0, 1, 6.0245, -Infinity, Infinity
        ].concat(opts);
        numOptsLen = numOpts.length;

        for (j = 0; j < numOptsLen; j += 1) {
          incorrectGameFactoryRoundsInvocation(numOpts[j]);
        }
      });

      it('returns an object with an immutable "mode" property', function() {
        var gameUndefinedMode,
          gameComputerVsComputer,
          gamePlayerVsComputer,
          gameUnknownConfig;

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

      /// * have the following properties:
      ///   * <Map> rounds
      ///     * <int> limit
      ///     * <int> target
      ///     * <int> played
      /// * have the following methods:
      ///   * reset // reset game => reset player stats
      it('returns an object with an immutable "rounds" object', function() {
        var g = game(),
          defaultRoundsObject;

        assert.throws(
          function() {
            g.rounds.played = 5;
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
        assert.deepEqual(g.rounds, defaultRoundsObject, 'expecting "rounds" to be "' +
          JSON.stringify(defaultRoundsObject) + '"');
      });
    });
  });

  function fnNoThrow(config, apiFn, lib) {
    var errMsg = 'expecting "' + [lib, apiFn.name].join('.') + '(' + JSON.stringify(config) +
      ')" not to fail';

    assert.doesNotThrow(function() {
      return apiFn(config);
    }, errMsg);
  }

  function incorrectGameFactoryInvocation(config) {
    assert.doesNotThrow(function() {
      game(config);
    });

    // assert.doesNotThrow(function() {
    //   game({
    //     mode: config,
    //     rounds: config
    //   });
    // });
  }

  function incorrectGameFactoryRoundsInvocation(config) {
    assert.doesNotThrow(function() {
      var g = game({
        rounds: config
      });
      console.info(g.rounds);
    });
  }
}());
