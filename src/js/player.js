(function() {
  'use strict';

  var
    api,
    player;

  /// usage:
  ///   var p = player({/* ... */});
  player = function player(opts) {
    var name,
      wins,
      losses,
      score;

    opts = opts || {};

    name = typeof opts === 'object' && opts.hasOwnProperty('name') &&
      typeof opts.name === 'string' && opts.name.trim() !== '' ? opts.name : 'Anon';

    wins = 0;
    losses = 0;

    return Object.freeze({
      get name() {
        return name;
      },

      get score() {
        return Object.freeze({
          wins: wins,
          losses: losses
        });
      },

      updateScores: function(n) {
        if (typeof n !== 'number') {
          throw new TypeError('expecting "n" to be in [-1,0,1]');
        }

        if (n === -1) {
          losses += 1;
        }

        if (n === 1) {
          wins += 1;
        }
      },

      resetScores: function() {
        wins = 0;
        losses = 0;
      }
    });
  };

  api = Object.freeze({
    player: player
  });

  module.exports = api;

  /// gratuitous logging to prove it works in the browser
  console.log('hello from player.js');
}());
