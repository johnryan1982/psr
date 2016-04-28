(function() {
  'use strict';

  var
    api,
    weapon;

  weapon = function weapon(opts) {
    var name, defeats;

    opts = opts || {};

    name = (function name() {
      if (typeof opts === 'object' && opts.hasOwnProperty('name') &&
        typeof opts.name === 'string') {
        return opts.name;
      }
      else {
        return 'not specified';
      }
    }());

    defeats = (function defeats() {
      if (typeof opts === 'object' && opts.hasOwnProperty('defeats') &&
        (typeof opts.defeats === 'object' && opts.defeats !== null &&
        !(opts.defeats instanceof Array))) {
        return opts.defeats;
      }
      else {
        return {
          otherWeaponName: 'destroys'
        };
      }
    }());

    return Object.freeze({
      get name() {
        return name;
      },
      get defeats() {
        return Object.freeze(defeats);
      }
    });
  };

  api = Object.freeze({
    weapon: weapon
  });

  module.exports = api;
}());
