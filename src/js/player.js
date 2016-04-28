/*globals console:false*/
(function() {
  'use strict';

  require('./polyfills/object.assign.js');

  var api, player;

  player = function player(opts) {
    var stats, name, fnReset, fnUpdateStats;

    opts = opts || {};

    stats = {
      wins: 0,
      losses: 0
    };

    name = (function name() {
      if (typeof opts === 'object' && opts.hasOwnProperty('name') &&
        typeof opts.name === 'string') {
        return opts.name;
      }
      else {
        return 'Anon';
      }
    }());

    fnReset = function reset() {
      stats.wins = 0;
      stats.losses = 0;
    };

    fnUpdateStats = function updateStats(n) {
      if (typeof n !== 'number') {
        throw new Error('expecting "n" to be numeric');
      }

      if (parseInt(n, 10) < -1 || parseInt(n, 10) > 1 || Math.abs(n) === Infinity) {
        throw new Error('expecting "n" to be in [-1, 0, 1]');
      }

      if (n === 1) {
        stats.wins += 1;
      }
      else if (n === -1) {
        stats.losses += 1;
      }
    };

    return Object.freeze({
      /// getters
      get name() {
        return name;
      },

      get stats() {
        return stats;
      },

      /// methods
      reset: fnReset,
      updateStats: fnUpdateStats
    });
  };

  api = Object.freeze({
    player: player
  });

  module.exports = api;
}());
