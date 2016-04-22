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
        assert.isFunction(playerlib.player);

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

    /// * expect a 'usr' configuration parameter and return an object
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
        testsLen = testcases.length,
        defaultName = 'Anon';

        for (i = 0; i < testsLen; i += 1) {
          incorrectPlayerFactoryInvocation(testcases[i], player, 'playerlib');
        }

        assert.equal(player({}).name, defaultName, 'expecting "player.name" to default to \'' +
          defaultName + '\'');
      });

      it('creates a player from "opts"', function() {
        var name = 'Prof. Plum',
          p = player({ name: name });

        assert.equal(p.name, name, 'expecting "player.name" to be "' + name + '"');
      });
    });

    describe('#player.score', function() {
      it('"player.score" returns an object with "wins" and "losses" properties', function() {
        var p = player({ name: 'Prof. Plum' }),
          startingScore = {
            wins: 0,
            losses: 0
          };

        assert.throws(
          function() {
            p.score.wins = 5;
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'expecting "player.score.wins" to be immutable'
        );

        assert.throws(
          function() {
            p.score.losses = 5;
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'expecting "player.score.losses" to be immutable'
        );

        assert.deepEqual(p.score, startingScore, 'expecting "player.score" to default to zero');
      });

      it('"updateScores" method updates "player.score" properties accordingly', function() {
        var p = player({ name: 'Prof. Plum' }),
          startingScore = {
            wins: 0,
            losses: 0
          };

        assert.deepEqual(p.score, startingScore, 'expecting "player.score" to default to zero');

        p.updateScores(1); /// win
        assert.equal(p.score.wins, 1, 'expecting "player.score.wins" to have updated');
        assert.equal(p.score.losses, 0, 'expecting "player.score.losses" to remain as 0');

        p.updateScores(-1); /// lose
        assert.equal(p.score.wins, 1, 'expecting "player.score.wins" to to remain as 1');
        assert.equal(p.score.losses, 1, 'expecting "player.score.losses" have updated');

        p.updateScores(0); /// draw
        assert.equal(p.score.wins, 1, 'expecting "player.score.wins" to remain as 1');
        assert.equal(p.score.losses, 1, 'expecting "player.score.losses" to remain as 1');

        assert.throws(
          function() {
            p.updateScores(null);
          },
          TypeError,
          'expecting "n" to be in [-1,0,1]',
          '"updateScores" expects an integer'
        );
      });

      it('"resetScores" method reset "player.score" properties to zero', function() {
        var p = player({ name: 'Prof. Plum' }),
          startingScore = {
            wins: 0,
            losses: 0
          };

        p.updateScores(1); /// win
        assert.equal(p.score.wins, 1, 'expecting "player.score.wins" to have updated');
        assert.equal(p.score.losses, 0, 'expecting "player.score.losses" to remain as 0');

        p.updateScores(-1); /// lose
        assert.equal(p.score.wins, 1, 'expecting "player.score.wins" to to remain as 1');
        assert.equal(p.score.losses, 1, 'expecting "player.score.losses" have updated');

        p.resetScores();
        assert.deepEqual(p.score, startingScore, 'expecting "player.score" to default to zero');
      });
    });
  });

  function incorrectPlayerFactoryInvocation(config) {
    var errMsgPre = 'expecting "playerlib.player(',
      errMsgPost = ')" to default to \'Anon\'',
      incorrectConfig,
      incorrectNameProperty,
      obj;

    incorrectConfig = player(config);
    assert.equal(incorrectConfig.name, 'Anon', errMsgPre + JSON.stringify(config) + errMsgPost);

    if (typeof config === 'string') {
      return;
    }

    obj = {
      name: config
    };
    incorrectNameProperty = player(obj);
    assert.equal(incorrectNameProperty.name, 'Anon', errMsgPre + JSON.stringify(obj) + errMsgPost);
  }
}());
