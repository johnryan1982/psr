(function() {
  'use strict';

  var
    api = {},
    player;

  /// usage:
  ///   var p = player({/* ... */});
  player = function player(opts) {
    opts = opts || {};

    var name = typeof opts !== 'undefined' && opts.hasOwnProperty('name') &&
      typeof opts.name === 'string' ? opts.name : 'Prof. Plum';

    return Object.defineProperties({}, {
      name: {
        configurable: false,
        enumerable: true,
        get: function() {
          return name;
        },
        set: function(val) {
          if (typeof val === 'undefined' || typeof val !== 'string' || val.toString() === '') {
            return;
          }
          name = val.trim();
        }
      }
    });
  };

  Object.defineProperties(api, {
    /// (static) player
    player: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: player
    }
  });

  module.exports = api;

  /// gratuitous logging to prove it works in the browser
  console.log('hello from player.js');
}());
