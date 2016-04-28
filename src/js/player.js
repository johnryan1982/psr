/*globals console:false*/
(function() {
  'use strict';

  require('./polyfills/object.assign.js');

  var
    api,
    player;

  player = function player(opts) {
    opts = opts || {};

    return Object.freeze({});
  };

  api = Object.freeze({
    player: player
  });

  module.exports = api;
}());
