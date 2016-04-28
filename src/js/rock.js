/*globals console:false*/
(function() {
  'use strict';

  require('./polyfills/object.assign.js');

  var
    /// libs
    weaponlib = require('./weapon.js'),

    /// lib APIs
    weapon = weaponlib.weapon,

    api,
    rock;

  rock = function rock(opts) {
    opts = opts || {};

    return Object.freeze(Object.assign({}, weapon({
      name: 'rock',
      defeats: opts.defeats
    })));
  };

  api = Object.freeze({
    rock: rock
  });

  module.exports = api;
}());
