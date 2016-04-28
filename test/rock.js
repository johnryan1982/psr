/*globals suite:false,test:false,setup:false,teardown:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    rocklib = require('../src/js/rock.js'),

    /// lib APIs
    rock = rocklib.rock,

    /// namespaced var to contain any tmp values created within setup (each
    /// of which can then be destroyed using delete within teardown)
    ns = {};

  suite('rocklib', function() {
    suite('$.rock factory function', function() {
      suite('$.rock(...)', function() {
        teardown('destroy rockObj', destroyRockObject);

        test('ignores all invalid values/configurations and returns an immutable object', function() {
          var datatypesLen, i;

          datatypesLen = utils.datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(utils.datatypes[i]);
          }
        });

        function configure(config) {
          ns.rockObj = rock(config);

          assert.isObject(ns.rockObj);
          assert.isFrozen(ns.rockObj);
        }
      });

      suite('$.rock().name', function() {
        teardown('destroy rockObj', destroyRockObject);

        test('always returns "rock"', function() {
          ns.rockObj = rock({
            name: 'stone'
          });
          assert.equal(ns.rockObj.name, 'rock');

          utils.throwImmutableTypeError(function() {
            ns.rockObj.name = 'stone';
          });
          assert.equal(ns.rockObj.name, 'rock');
        });
      });

      suite('$.rock({defeats:...})', function() {
        teardown('destroy rockObj', destroyRockObject);

        test('returns an immutable object', function() {
          var config = {
            scissors: 'smashes'
          };

          ns.rockObj = rock({
            defeats: config
          });
          assert.deepEqual(ns.rockObj.defeats, config);

          utils.throwImmutableTypeError(function() {
            delete ns.rockObj.defeats;
          });
          utils.throwImmutableTypeError(function() {
            ns.rockObj.defeats = {};
          });
          utils.throwImmutableTypeError(function() {
            delete ns.rockObj.defeats.scissors;
          });
          utils.throwImmutableTypeError(function() {
            ns.rockObj.defeats.scissors = 'blunts';
          });
          utils.throwImmutableTypeError(function() {
            ns.rockObj.defeats.otherWeapon = 'defeats';
          });

          assert.deepEqual(ns.rockObj.defeats, config);
        });
      });
    });
  });

  function destroyRockObject() {
    delete ns.rockObj;
  }

}());
