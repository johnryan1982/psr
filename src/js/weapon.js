(function() {
  'use strict';

  var api,
    weapon;

  /// usage:
  ///   var paper = weapon({
  ///     name: 'Paper',
  ///     defeats: {
  ///       'Rock': 'covers'
  ///     }
  ///   });
  weapon = function weapon(opts) {
    if (!opts || typeof opts !== 'object') {
      throw new TypeError('check params: expecting an object, received ' + JSON.stringify(opts));
    }

    if (!opts.hasOwnProperty('name') || typeof opts.name !== 'string' || opts.name.trim() === '') {
      throw new TypeError('check params: expecting opts.name to be a non-empty string, received ' +
        JSON.stringify(opts.name));
    }

    if (!opts.hasOwnProperty('defeats') || typeof opts.defeats !== 'object') {
      throw new TypeError('check params: expecting opts.defeats to be a string, received ' +
        JSON.stringify(opts.defeats));
    }

    return Object.freeze({
      name: opts.name,
      defeats: Object.freeze(opts.defeats)
    });
  };

  api = Object.freeze({
    weapon: weapon
  });

  module.exports = api;
}());
