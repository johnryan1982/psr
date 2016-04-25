/// Polyfill taken from MDN:
/// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
(function() {
  'use strict';
  if (typeof Number.isNaN !== 'function') {
    (function() {
      Number.isNaN = Number.isNaN || function(value) {
        return value !== value;
      };
    }());
  }
}());
