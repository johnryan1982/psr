(function() {
  'use strict';

  /// polyfill - no need to cache
  require('../polyfills/object.assign.js');

  var
    TYPE_C2C = 'c2c',
    TYPE_P2C = 'p2c',
    TYPES = [TYPE_C2C, TYPE_P2C],

    api = {},
    game;

  /// usage:
  ///   var g = game({/* ... */});
  game = function game(opts) {
    opts = opts || {};

    var state;

    state = {
      type: TYPES.indexOf(opts.type) > -1 ? opts.type : TYPE_C2C
    };

    return state;
  };

  Object.defineProperties(api, {
    'game': {
      enumerable: true,
      configurable: false,
      value: game
    },

    /** read-only, immutable properties */

    /// 'c2c' type (computer-vs-computer)
    'c2c': {
      enumerable: true,
      writable: false,
      configurable: false,
      value: TYPE_C2C
    },

    /// 'p2c' type (player-vs-computer)
    'p2c': {
      enumerable: true,
      writable: false,
      configurable: false,
      value: TYPE_P2C
    }
  });

  module.exports = api;
}());
