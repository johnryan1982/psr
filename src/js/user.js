(function() {
  'use strict';

  var
    api = {},
    user;

  /// usage:
  ///   var p = user({/* ... */});
  user = function user(opts) {
    opts = opts || {};

    return Object.freeze({
      name: typeof opts !== 'undefined' && opts.hasOwnProperty('name') &&
        typeof opts.name === 'string' ? opts.name : 'The Dark Night'
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
