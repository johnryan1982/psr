(function() {
  'use strict';

  require('./game.js');

  var api = {
    name: 'Teresa'
  };

  /// gratuitous logging to prove it works in the browser
  console.log('hello from main.js');

  module.exports = api;
}());
