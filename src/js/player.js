/*globals console:false*/
(function() {
  'use strict';

  require('./polyfills/object.assign.js');

  var
    api,
    player;

  player = function player(opts) {
    var name;

    opts = opts || {};

    name = (function name() {
      if (typeof opts === 'object' && opts.hasOwnProperty('name') &&
        typeof opts.name === 'string') {
        return opts.name;
      }
      else {
        return 'Anon';
      }
    }());

    return Object.freeze({
      get name() {
        return name;
      }
    });
  };

  api = Object.freeze({
    player: player
  });

  module.exports = api;
}());
