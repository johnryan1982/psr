/*globals describe:false,it:false*/
(function() {
  'use strict';

  var assert = require('./assert.js'),

    api,

    /// TypeError regex for major browsers when attempting to modify a readonly property
    ///   [IE] Object doesn't support this action
    ///   [Chrome] object is not extensible
    ///   [Mobile Safari] readonly
    immutableTypeErrorRegExp = /(?:.*)(read([- ]?)only|Object doesn\'t support this action|object is not extensible|Cannot set property (?:.*) which has only a getter|Cannot create property for a non-extensible object|Cannot delete property)(?:.*)/,

    /// custom TypeError thrown when a function is expecting to receive an [optionally decorated] object
    objectExpectedError = /check params: expecting (?:.*), received (?:.*)/,

    /// datatypes contains a list of possible data types once could expect, and therefore test against
    datatypes = Object.freeze([
      undefined,
      null,
      true,   /// test for both as evaluating a truthy/falsy value (eg. Number(true)) might
      false,  /// otherwise slip through the net
      3,
      'string',
      function() { return true; },
      {},     /// catch all
      []      /// not strictly necessary as not a true data type, arrays are commonly used
    ]);

  function throwImmutableTypeError(cb, errMsg) {
    errMsg = errMsg || 'property should be immutable';
    assert.throw(
      function() {
        cb();
      },
      TypeError,
      immutableTypeErrorRegExp,
      errMsg
    );
  }

  api = Object.freeze({
    immutableTypeErrorRegExp: immutableTypeErrorRegExp,
    objectExpectedError: objectExpectedError,
    datatypes: datatypes,

    throwImmutableTypeError: throwImmutableTypeError
  });

  module.exports = api;
}());
