(function() {
  'use strict';

  var
    api,
    player;

  /// usage:
  ///   var p = player({/* ... */});
  player = function player(opts) {
    opts = opts || {};

    var name = typeof opts === 'object' && opts.hasOwnProperty('name') &&
      typeof opts.name === 'string' && opts.name.trim() !== '' ? opts.name : 'Anon';

    return Object.freeze({
      get name() {
        return name;
      },
      set name(val) {
        if (typeof val === 'undefined' || typeof val !== 'string' || val.trim() === '') {
          return;
        }
        name = val.trim();
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
