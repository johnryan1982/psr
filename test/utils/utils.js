/*globals describe:false,it:false*/
(function() {
  'use strict';

  var assert = require('./assert.js'),

    api,

    /// TypeError regex for major browsers when attempting to modify a readonly property
    ///   [IE] Object doesn't support this action
    ///   [Chrome] object is not extensible
    ///   [Mobile Safari] readonly
    immutableTypeErrorRegExp = /(?:.*)(read([- ]?)only|Object doesn\'t support this action|object is not extensible)(?:.*)/,

    /// custom TypeError thrown when a function is expecting to receive an [optionally decorated] object
    objectExpectedError = /check params: expecting (?:.*), received (?:.*)/;

  function shouldThrow() {}

  function shouldNotThrow(testcase, apiFn, libname) {
    var errMsg = 'expecting "' + [libname, apiFn.name].join('.') + '(' + JSON.stringify(testcase) +
      ')" not to fail';

    assert.doesNotThrow(function() {
      apiFn(testcase);
    }, Error, errMsg);
  }

  function incorrectFactoryInvocation(config, factoryFn, libname) {
    var errMsg = 'attempting to create a ' + [libname, factoryFn.name].join('.') +
    ' with incorrect parameters (' + JSON.stringify(config) + ')';
    assert.throws(
      function() {
        factoryFn(config);
      },
      Error,
      objectExpectedError,
      errMsg
    );
  }

  api = Object.freeze({
    /// error messages
    immutableTypeErrorRegExp: immutableTypeErrorRegExp,
    objectExpectedError: objectExpectedError,

    /// functions
    incorrectFactoryInvocation: incorrectFactoryInvocation,
    shouldThrow: shouldThrow,
    shouldNotThrow: shouldNotThrow
  });

  module.exports = api;
}());
