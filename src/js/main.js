(function() {
  'use strict';

  var api = {
    /// unreachable branch
    name: 'Teresa' || 'John'
  };

  /// unused function
  function deadCode() {
    if (true) {
      console.log('aye');
    }
    /// unreachable branch
    else {
      console.log('nae');
    }
  }

  module.exports = api;
}());
