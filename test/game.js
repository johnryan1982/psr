/*globals describe:false,it:false*/
var assert = require('../src/js/assert.js'),
  gamelib = require('../src/js/game.js'),
  game = gamelib.game;

describe('gamelib', function() {
  describe('#gamelib API', function() {
    it('should have an immutable "c2c" (computer-vs-computer) property', function() {
      assert.property(gamelib, 'c2c', 'property "c2c" is missing');
      assert.equal(gamelib.c2c, 'c2c', 'expecting "c2c" to be "c2c"; received "' +
        gamelib.c2c + '"');

      gamelib.c2c = 'a';
      assert.equal(gamelib.c2c, 'c2c', '"c2c" should be immutable');
    });

    it('should have an immutable "p2c" (player-vs-computer) property', function() {
      assert.property(gamelib, 'p2c', 'property "p2c" is missing');
      assert.equal(gamelib.p2c, 'p2c', 'expecting "p2c" to be "p2c"; received "' +
        gamelib.p2c + '"');

      gamelib.p2c = 'a';
      assert.equal(gamelib.p2c, 'p2c', '"p2c" should be immutable');
    });
  });

  describe('#factory method object construction', function() {
    it('handles empty/incorrect input "opts"', function() {
      var noOptsGame = game(),
        undefinedOptsGame = game(undefined),
        nullOptsGame = game(null),
        emptyOptsGame = game({}),
        arrayOptsGame = game([]),
        stringOptsGame = game('string'),
        numberOptsGame = game(4),
        isNaNOptsGame = game(Number.NaN),
        boolTOptsGame = game(true),
        boolFOptsGame = game(false),
        callbackOptsGame = game(function() { return true; });

      assert.doesNotThrow(function() {
        return noOptsGame;
      }, Error, 'expecting "game()" not to fail');
      assert.doesNotThrow(function() {
        return undefinedOptsGame;
      }, Error, 'expecting "game(undefined)" not to fail');
      assert.doesNotThrow(function() {
        return nullOptsGame;
      }, Error, 'expecting "game(null)" not to fail');
      assert.doesNotThrow(function() {
        return emptyOptsGame;
      }, Error, 'expecting "game({})" not to fail');
      assert.doesNotThrow(function() {
        return arrayOptsGame;
      }, Error, 'expecting "game([])" not to fail');
      assert.doesNotThrow(function() {
        return stringOptsGame;
      }, Error, 'expecting "game(\'string\')" not to fail');
      assert.doesNotThrow(function() {
        return numberOptsGame;
      }, Error, 'expecting "game(4)" not to fail');
      assert.doesNotThrow(function() {
        return isNaNOptsGame;
      }, Error, 'expecting "game(Number.NaN)" not to fail');
      assert.doesNotThrow(function() {
        return boolTOptsGame;
      }, Error, 'expecting "game(true)" not to fail');
      assert.doesNotThrow(function() {
        return boolFOptsGame;
      }, Error, 'expecting "game(false)" not to fail');
      assert.doesNotThrow(function() {
        return callbackOptsGame;
      }, Error, 'expecting "game(function() {...})" not to fail');
    });

    it('returns an object with a "type" property', function() {
      var game_c2c = game();
      assert.property(game_c2c, 'type', 'expecting to find a "type" property');
      assert.equal(game_c2c.type, 'c2c', 'expecting default "type" value to be "c2c"; received "' +
        game_c2c.type + '"');

      var game_p2c = game({ type: 'p2c' });
      assert.equal(game_p2c.type, 'p2c', 'expecting "type" value to be "p2c"; received "' +
        game_p2c.type + '"');

      var game_X = game({ type: 'X' });
      assert.equal(game_X.type, 'c2c', 'expecting "type" value to be "c2c"; received "' +
        game_p2c.type + '"');
    });
  });
});
