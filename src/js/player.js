(function() {
  'use strict';

  var
    api = {},
    player;

  /// usage:
  ///   var p = player({/* ... */});
  player = function player() {};

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
