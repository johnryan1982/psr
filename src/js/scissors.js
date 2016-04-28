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
    scissors;

  scissors = function scissors(opts) {
    opts = opts || {};

    return Object.freeze(Object.assign({}, weapon({
      name: 'scissors',
      defeats: opts.defeats
    })));
  };

  api = Object.freeze({
    scissors: scissors
  });

  module.exports = api;
}());
