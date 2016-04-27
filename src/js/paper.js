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
    paper;

  paper = function paper(opts) {
    opts = opts || {};

    return Object.freeze(Object.assign({}, weapon({
      name: 'paper',
      defeats: opts.defeats
    })));
  };

  api = Object.freeze({
    paper: paper
  });

  module.exports = api;
}());
