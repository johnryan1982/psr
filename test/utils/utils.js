/*globals describe:false,it:false*/
(function() {
  'use strict';

  var assert = require('./assert.js'),

    api,

    /// TypeError regex for major browsers
    ///   [IE] Object doesn't support this action
    ///   [Chrome] object is not extensible
    ///   [Mobile Safari] readonly
    immutableTypeErrorRegExp = /(?:.*)(read([- ]?)only|Object doesn\'t support this action|object is not extensible)(?:.*)/;

  function shouldThrow() {}

  function shouldNotThrow(testcase, apiFn, lib) {
    var errMsg = 'expecting "' + [lib, apiFn.name].join('.') + '(' + JSON.stringify(testcase) +
      ')" not to fail';

    assert.doesNotThrow(function() {
      apiFn(testcase);
    }, Error, errMsg);
  }

  api = {
    immutableTypeErrorRegExp: immutableTypeErrorRegExp,
    shouldThrow: shouldThrow,
    shouldNotThrow: shouldNotThrow
  };

  module.exports = api;
}());
