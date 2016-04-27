(function() {
  'use strict';

  var
    api,
    weapon;

  weapon = function weapon(opts) {
    return Object.freeze({});
  };

  api = Object.freeze({
    weapon: weapon
  });

  module.exports = api;
}());
