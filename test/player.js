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
      it('#has a static "player" factory function', function() {
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
      it('#handles empty/incorrect input "opts"', function() {
        var opts, i, optsLen, defaultName;

        opts = [
          undefined, null, {}, [], 'string', 4, Number.NaN, false, function() { return true; }
        ];
        optsLen = opts.length;

        for (i = 0; i < optsLen; i += 1) {
          incorrectPlayerFactoryInvocation(opts[i], player, 'playerlib');
        }

        defaultName = 'Anon';
        assert.equal(player({}).name, defaultName, 'expecting "playerObj.name" to default to "' +
          defaultName + '"');
      });

      it('#returns a (playerObj) object from "opts"', function() {
        var name, playerObj;

        name = 'Prof. Plum';
        playerObj = player({
          name: name
        });

        assert.equal(playerObj.name, name, 'expecting "playerObj.name" to be "' + name + '"');
      });
    });

    describe('#playerObj.score', function() {
      it('#returns an object with "wins" and "losses" properties', function() {
        var playerObj, startingScore;

        playerObj = player({
          name: 'Prof. Plum'
        });
        startingScore = {
          wins: 0,
          losses: 0
        };

        assert.throws(
          function() {
            playerObj.score.wins = 5;
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'expecting "playerObj.score.wins" to be immutable'
        );

        assert.throws(
          function() {
            playerObj.score.losses = 5;
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'expecting "playerObj.score.losses" to be immutable'
        );

        assert.deepEqual(playerObj.score, startingScore, 'expecting "playerObj.score" to default to zero');
      });

      it('#updateScores method updates "playerObj.score" properties accordingly', function() {
        var playerObj, startingScore;

        playerObj = player({
          name: 'Prof. Plum'
        });
        startingScore = {
          wins: 0,
          losses: 0
        };

        assert.deepEqual(playerObj.score, startingScore, 'expecting "playerObj.score" to default to zero');

        playerObj.updateScores(1); /// win
        assert.equal(playerObj.score.wins, 1, 'expecting "playerObj.score.wins" to have updated');
        assert.equal(playerObj.score.losses, 0, 'expecting "playerObj.score.losses" to remain as 0');

        playerObj.updateScores(-1); /// lose
        assert.equal(playerObj.score.wins, 1, 'expecting "playerObj.score.wins" to to remain as 1');
        assert.equal(playerObj.score.losses, 1, 'expecting "playerObj.score.losses" have updated');

        playerObj.updateScores(0); /// draw
        assert.equal(playerObj.score.wins, 1, 'expecting "playerObj.score.wins" to remain as 1');
        assert.equal(playerObj.score.losses, 1, 'expecting "playerObj.score.losses" to remain as 1');

        assert.throws(
          function() {
            playerObj.updateScores(null);
          },
          TypeError,
          'expecting "n" to be in [-1,0,1]',
          '"updateScores" expects an integer'
        );
      });

      it('#resetScores method reset "playerObj.score" properties to zero', function() {
        var playerObj, startingScore;

        playerObj = player({
          name: 'Prof. Plum'
        });
        startingScore = {
          wins: 0,
          losses: 0
        };

        playerObj.updateScores(1); /// win
        assert.equal(playerObj.score.wins, 1, 'expecting "playerObj.score.wins" to have updated');
        assert.equal(playerObj.score.losses, 0, 'expecting "playerObj.score.losses" to remain as 0');

        playerObj.updateScores(-1); /// lose
        assert.equal(playerObj.score.wins, 1, 'expecting "playerObj.score.wins" to to remain as 1');
        assert.equal(playerObj.score.losses, 1, 'expecting "playerObj.score.losses" have updated');

        playerObj.resetScores();
        assert.deepEqual(playerObj.score, startingScore, 'expecting "playerObj.score" to default to zero');
      });
    });
  });

  function incorrectPlayerFactoryInvocation(config) {
    var errMsgPre, errMsgPost, incorrectConfig, incorrectNameProperty, obj;

    errMsgPre = 'expecting "playerlib.player(';
    errMsgPost = ')" to default to \'Anon\'';
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
