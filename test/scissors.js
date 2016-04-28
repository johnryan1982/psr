/*globals suite:false,test:false,setup:false,teardown:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    scissorslib = require('../src/js/scissors.js'),

    /// lib APIs
    scissors = scissorslib.scissors,

    /// namespaced var to contain any tmp values created within setup (each
    /// of which can then be destroyed using delete within teardown)
    ns = {};

  suite('scissorslib', function() {
    suite('$.scissors factory function', function() {
      suite('$.scissors(...)', function() {
        teardown('destroy scissorsObj', destroyScissorsObject);

        test('ignores all illegal values/configurations and returns an immutable object', function() {
          var datatypesLen, i;

          datatypesLen = utils.datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(utils.datatypes[i]);
          }
        });

        function configure(config) {
          ns.scissorsObj = scissors(config);

          assert.isObject(ns.scissorsObj);
          assert.isFrozen(ns.scissorsObj);
        }
      });

      suite('$.scissors().name', function() {
        teardown('destroy scissorsObj', destroyScissorsObject);

        test('always returns "scissors"', function() {
          ns.scissorsObj = scissors({
            name: 'sword'
          });
          assert.equal(ns.scissorsObj.name, 'scissors');

          utils.throwImmutableTypeError(function() {
            ns.scissorsObj.name = 'sword';
          });
          assert.equal(ns.scissorsObj.name, 'scissors');
        });
      });

      suite('$.scissors({defeats:...})', function() {
        teardown('destroy scissorsObj', destroyScissorsObject);

        test('returns an immutable object"', function() {
          var config = {
            paper: 'cut'
          };

          ns.scissorsObj = scissors({
            defeats: config
          });
          assert.deepEqual(ns.scissorsObj.defeats, config);

          utils.throwImmutableTypeError(function() {
            delete ns.scissorsObj.defeats;
          });
          utils.throwImmutableTypeError(function() {
            ns.scissorsObj.defeats = {};
          });
          utils.throwImmutableTypeError(function() {
            delete ns.scissorsObj.defeats.paper;
          });
          utils.throwImmutableTypeError(function() {
            ns.scissorsObj.defeats.paper = 'shred';
          });
          utils.throwImmutableTypeError(function() {
            ns.scissorsObj.defeats.otherWeapon = 'defeats';
          });

          assert.deepEqual(ns.scissorsObj.defeats, config);
        });
      });
    });
  });

  function destroyScissorsObject() {
    delete ns.scissorsObj;
  }

}());
