(function() {
  'use strict';

  var
    /// immutable
    GAME_MODES = Object.freeze(['cc', 'pc']),

    api = {},
    game;

  /// usage:
  ///   var g = game({/* ... */});
  game = function game(opts) {
    opts = opts || {};

    var mode = typeof opts !== 'undefined' && opts.hasOwnProperty('mode') &&
      GAME_MODES.indexOf(opts.mode) > -1 ? opts.mode : GAME_MODES[0];

    var state = Object.defineProperties({}, {
      mode: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: mode
      },
      players: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: Object.freeze(['a', 'b'])
      }
    });

    return state;
  };

  Object.defineProperties(api, {
    /// (static) game
    game: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: game
    },

    /// (static const) computer-vs-computer
    modeCC: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: GAME_MODES[0]
    },

    /// (static const) player-vs-computer
    modePC: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: GAME_MODES[1]
    },

    /// (static) modes
    modes: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: GAME_MODES
    }
  });

  module.exports = api;

  /// gratuitous logging to prove it works in the browser
  console.log('hello from game.js');
}());
