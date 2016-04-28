/*globals suite:false,test:false,setup:false,teardown:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    playerlib = require('../src/js/player.js'),

    /// lib APIs
    player = playerlib.player,

    /// namespaced var to contain any tmp values created within setup (each
    /// of which can then be destroyed using delete within teardown)
    ns = {};

  suite('playerlib', function() {
    suite('$.player factory function', function() {
      suite('$.player(...)', function() {
        teardown('destroy playerObj', destroyPlayerObject);

        test('ignores all invalid values/configurations and returns an immutable object', function() {
          var datatypesLen, i;

          datatypesLen = utils.datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(utils.datatypes[i]);
          }
        });

        function configure(config) {
          ns.playerObj = player(config);

          assert.isObject(ns.playerObj);
          assert.isFrozen(ns.playerObj);
        }
      });

      suite('$.player({name:...})', function() {
        teardown('destroy playerObj', destroyPlayerObject);

        test('ignores all invalid values/configurations', function() {
          var datatypes, datatypesLen, i;

          /// strings are valid input and are tested elsewhere
          datatypes = utils.datatypes.filter(function removeString(val) {
            return typeof val !== 'string';
          });
          datatypesLen = datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(datatypes[i]);
          }
        });

        test('covers valid $.name configuration', function() {
          var player = 'Rev. Green';

          configure(player, player);
        });

        function configure(config, expected) {
          expected = expected || 'Anon';

          ns.playerObj = player({
            name: config
          });

          assert.equal(ns.playerObj.name, expected);
        }
      });

      suite('$.player().updateStats(n)', function() {
        teardown('destroy playerObj', destroyPlayerObject);

        test('updates the player score statistics', function() {
          ns.playerObj = player();

          ns.playerObj.updateStats(1);
          assert.equal(ns.playerObj.stats.wins, 1);

          ns.playerObj.updateStats(-1);
          assert.equal(ns.playerObj.stats.losses, 1);

          ns.playerObj.reset();
          assert.equal(ns.playerObj.stats.wins, 0);
          assert.equal(ns.playerObj.stats.losses, 0);
        });

        test('ignores all invalid values', function() {
          var datatypes, datatypesLen, i, invalidNumericValues, invalidNumericValuesLen, j;

          /// numbers are valid input and are tested elsewhere
          datatypes = utils.datatypes.filter(function removeNumeric(val) {
            return typeof val !== 'number';
          });
          datatypesLen = datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            invalid(datatypes[i]);
          }

          invalidNumericValues = [-Infinity, -2, 2.1, Infinity];
          invalidNumericValuesLen = invalidNumericValues.length;
          for (j = 0; j < invalidNumericValuesLen; j += 1) {
            invalid(invalidNumericValues[j]);
          }
        });

        function invalid(config) {
          ns.playerObj = player();

          assert.throws(
            function() {
              ns.playerObj.updateStats(config);
            },
            /expecting "n" to be /,
            'invalid $.player().updateStats(' + config + ') invocation'
          );

          assert.deepEqual(ns.playerObj.stats, {
            wins: 0,
            losses: 0
          });
        }
      });

      suite('$.player().reset()', function() {
        teardown('destroy playerObj', destroyPlayerObject);

        test('resets the current player score statistics', function() {
          ns.playerObj = player();

          ns.playerObj.updateStats(1);
          ns.playerObj.updateStats(0);
          assert.equal(ns.playerObj.stats.wins, 1);

          ns.playerObj.updateStats(-1);
          assert.equal(ns.playerObj.stats.losses, 1);

          ns.playerObj.reset();
          assert.equal(ns.playerObj.stats.wins, 0);
          assert.equal(ns.playerObj.stats.losses, 0);
        });
      });
    });
  });

  function destroyPlayerObject() {
    delete ns.playerObj;
  }

}());
