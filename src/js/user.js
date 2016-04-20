(function() {
  'use strict';

  var
    api = {},
    user;

  /// usage:
  ///   var u = user({/* ... */});
  user = function user(opts) {
    opts = opts || {};

    var name = typeof opts !== 'undefined' && opts.hasOwnProperty('name') &&
      typeof opts.name === 'string' ? opts.name : 'Mr. Green';

    return Object.defineProperties({}, {
      name: {
        configurable: false,
        enumerable: true,
        get: function() {
          return name;
        },
        set: function(val) {
          if (typeof val === 'undefined' || typeof val !== 'string' || val.toString() === '') {
            return;
          }
          name = val.trim();
        }
      }
    });
  };

  Object.defineProperties(api, {
    /// (static) user
    user: {
      configurable: false,
      enumerable: true,
      writable: false,
      value: user
    }
  });

  module.exports = api;

  /// gratuitous logging to prove it works in the browser
  console.log('hello from user.js');
}());
