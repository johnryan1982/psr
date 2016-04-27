(function() {
  'use strict';

  var
    api,
    weapon;

  weapon = function weapon(opts) {
    var name;

    opts = opts || {};

    if (typeof opts === 'object' && opts.hasOwnProperty('name') && typeof opts.name === 'string') {
      name = opts.name;
    }
    else {
      name = 'not specified';
    }

    return Object.freeze({
      get name() {
        return name;
      }
    });
  };

  api = Object.freeze({
    weapon: weapon
  });

  module.exports = api;
}());
