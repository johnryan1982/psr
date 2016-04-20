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
}());
