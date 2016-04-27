/*globals suite:false,test:false,setup:false,teardown:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    gamelib = require('../src/js/game.js'),

    /// lib APIs
    game = gamelib.game,

    /// namespaced var to contain any tmp values created within setup (each
    /// of which can then be destroyed using delete within teardown)
    ns = {},

    /// other
    gameModes = Object.freeze(['cc', 'pc']),
    gamePlayers = Object.freeze(['Prof. Plum', 'Col. Mustard']),
    gameRounds = Object.freeze({
      limit: 3,
      target: 2,
      played: 0
    }),
    gameWeapons = Object.freeze({
      'paper': Object.freeze({
        name: 'paper',
        defeats: Object.freeze({
          rock: 'covers'
        })
      }),
      'scissors': Object.freeze({
        name: 'scissors',
        defeats: Object.freeze({
          paper: 'cut'
        })
      }),
      'rock': Object.freeze({
        name: 'rock',
        defeats: Object.freeze({
          scissors: 'crushes'
        })
      })
    });

  suite('gamelib', function() {
    suite('$.modes list', function() {
      test('is an immutable list', function() {
        var mutators, mutatorsLen, i;

        mutators = [
          function() { gamelib.modes.push(3); },
          function() { gamelib.modes.pop(); },
          function() { gamelib.modes[0] = 4; },
          function() { gamelib.modes = []; }
        ];
        mutatorsLen = mutators.length;

        assert.deepEqual(gamelib.modes, gameModes);
        for (i = 0; i < mutatorsLen; i += 1) {
          utils.throwTypeError(mutators[i]);
        }
        assert.deepEqual(gamelib.modes, gameModes);
      });
    });

    suite('$.game factory function', function() {
      suite('$.game(...)', function() {
        teardown('destroy gameObj', destroyGameObject);

        test('ignores all illegal values/configurations and returns an immutable object', function() {
          var datatypesLen, i;

          datatypesLen = utils.datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(utils.datatypes[i]);
          }
        });

        function configure(config) {
          ns.gameObj = game(config);

          assert.isObject(ns.gameObj);
          assert.isFrozen(ns.gameObj);
        }
      });

      suite('$.game({mode:...})', function() {
        teardown('destroy gameObj', destroyGameObject);

        test('ignores all illegal values/configurations', function() {
          var datatypesLen, i;

          datatypesLen = utils.datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(utils.datatypes[i]);
          }
        });

        test('covers legal (finite) $.modes values', function() {
          var gameModesLen, i;

          gameModesLen = gameModes.length;

          for (i = 0; i < gameModesLen; i += 1) {
            configure(gameModes[i], gameModes[i]);
          }
        });

        function configure(config, expected) {
          expected = expected || gameModes[0];

          ns.gameObj = game({
            mode: config
          });

          assert.equal(ns.gameObj.mode, expected);
        }
      });

      suite('$.game({rounds:...})', function() {
        teardown('destroy gameObj', destroyGameObject);

        test('ignores all illegal values/configurations', function() {
          var datatypes, datatypesLen, i;

          /// numbers are valid input and are tested elsewhere
          datatypes = utils.datatypes.filter(function removeNumeric(val) {
            return typeof val !== 'number';
          });
          datatypesLen = datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(datatypes[i]);
          }
        });

        test('covers legal $.rounds values', function() {
          var configs, configsLen, i, subConfig, subConfigLen, j;

          configs = [
            {
              vals: [-1, 0, 1],
              expected: {
                limit: 1,
                target: 1,
                played: 0
              }
            },
            {
              vals: [-2, 2, -3, 3],
              expected: {
                limit: 3,
                target: 2,
                played: 0
              }
            },
            {
              vals: [-4, 4],
              expected: {
                limit: 5,
                target: 3,
                played: 0
              }
            },
            {
              vals: [-5.0000001, 5.0000001, -6.4578, 6.4578],
              expected: {
                limit: 7,
                target: 4,
                played: 0
              }
            },
            {
              vals: [-Infinity, Infinity],
              expected: {
                limit: -1,
                target: -1,
                played: 0
              }
            }
          ];
          configsLen = configs.length;

          for (i = 0; i < configsLen; i += 1) {
            subConfig = configs[i];
            subConfigLen = subConfig.vals.length;
            for (j = 0; j < subConfigLen; j += 1) {
              configure(subConfig.vals[j], subConfig.expected);
            }
          }
        });

        function configure(config, expected) {
          expected = expected || gameRounds;

          ns.gameObj = game({
            rounds: config
          });

          assert.deepEqual(ns.gameObj.rounds, expected);
        }
      });

      suite('$.game({players:...})', function() {
        teardown('destroy gameObj', destroyGameObject);

        test('ignores all illegal values/configurations', function() {
          var datatypes, datatypesLen, i;

          /// strings are valid input and are tested elsewhere
          datatypes = utils.datatypes.filter(function removeString(val) {
            return typeof val !== 'string';
          });
          datatypesLen = datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(datatypes[i]);
          }
        });

        test('covers legal $.players configuration', function() {
          var player = 'Rev. Green';

          configure(player, [player, gamePlayers[1]]);
        });

        function configure(config, expected) {
          expected = expected || gamePlayers;

          ns.gameObj = game({
            player: config
          });

          assert.deepEqual(ns.gameObj.players, expected);
        }
      });

      suite('$.game({weapons:...})', function() {
        teardown('destroy gameObj', destroyGameObject);

        test('ignores all illegal values/configurations', function() {
          var datatypes, datatypesLen, i;

          /// objects are valid input and are tested elsewhere
          datatypes = utils.datatypes.filter(function removeString(val) {
            return typeof val !== 'string' || (val === null || val instanceof Array);
          });
          datatypesLen = datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(datatypes[i]);
          }
        });

        test('covers legal $.weapons configuration');

        test('is an immutable object', function() {
          var mutators, mutatorsLen, i;

          mutators = [
            function() { delete ns.gameObj.weapons; },
            function() { ns.gameObj.weapons = {}; },
            function() { delete ns.gameObj.weapons.paper; },
            function() { ns.gameObj.weapons.paper = {}; },
            function() { ns.gameObj.weapons.asparagus = {}; }
          ];
          mutatorsLen = mutators.length;

          ns.gameObj = game();

          assert.deepEqual(ns.gameObj.weapons, gameWeapons);
          for (i = 0; i < mutatorsLen; i += 1) {
            utils.throwTypeError(mutators[i]);
          }
          assert.deepEqual(ns.gameObj.weapons, gameWeapons);
        });

        function configure(config, expected) {
          expected = expected || gameWeapons;

          ns.gameObj = game({
            weapons: config
          });

          assert.deepEqual(ns.gameObj.weapons, expected);
        }
      });

      suite('$.game().fight()', function() {
        teardown('destroy gameObj', destroyGameObject);

        test('compares 2 weapons and returns the result (-1, 0, or 1)', function() {
          ns.gameObj = game();

          assert.oneOf(ns.gameObj.fight('paper', 'scissors'), [-1, 0, 1], 'expecting one of [-1, 0, 1]');
        });

        test('correctly updates $.game().rounds.played', function() {
          ns.gameObj = game();

          ns.gameObj.fight('paper', 'scissors'); /// a < b => -1
          assert.equal(ns.gameObj.rounds.played, 1);

          ns.gameObj.fight('paper', 'paper'); /// a === b => 0
          assert.equal(ns.gameObj.rounds.played, 1);

          ns.gameObj.fight('scissors', 'paper'); /// a > b => 1
          assert.equal(ns.gameObj.rounds.played, 2);

          assert.throws(
            function() {
              ns.gameObj.fight('apple', 'paper');
            },
            'check params: "apple" is not a member of "weapons"',
            'incorrect "a" parameter passed to $.game.fight()'
          );
          assert.throws(
            function() {
              ns.gameObj.fight('paper', 'pear');
            },
            'check params: "pear" is not a member of "weapons"',
            'incorrect "b" parameter passed to $.game.fight()'
          );
          assert.equal(ns.gameObj.rounds.played, 2);
        });
      });

      suite('$.game().reset()', function() {
        teardown('destroy gameObj', destroyGameObject);

        test('resets the current game using existing configuration', function() {
          ns.gameObj = game();

          ns.gameObj.fight('paper', 'scissors');
          assert.equal(ns.gameObj.rounds.played, 1);
          ns.gameObj.reset();
          assert.equal(ns.gameObj.rounds.played, 0);
        });
      });
    });
  });

  function destroyGameObject() {
    delete ns.gameObj;
  }

}());
