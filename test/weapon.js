/*globals suite:false,test:false,setup:false,teardown:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    weaponlib = require('../src/js/weapon.js'),

    /// lib APIs
    weapon = weaponlib.weapon,

    /// namespaced var to contain any tmp values created within setup (each
    /// of which can then be destroyed using delete within teardown)
    ns = {};

  suite('weaponlib', function() {
    suite('$.weapon factory function', function() {
      suite('$.weapon(...)', function() {
        teardown('destroy weaponObj', destroyWeaponObject);

        test('ignores all illegal values/configurations and returns an immutable object', function() {
          var datatypesLen, i;

          datatypesLen = utils.datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(utils.datatypes[i]);
          }
        });

        function configure(config) {
          ns.weaponObj = weapon(config);

          assert.isObject(ns.weaponObj);
          assert.isFrozen(ns.weaponObj);
        }
      });

      suite('$.weapon({name:...})', function() {
        teardown('destroy weaponObj', destroyWeaponObject);

        test('ignores all illegal values/configurations and returns an immutable object', function() {
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

        test('covers legal $.name configurations', function() {
          var name = 'paper';

          configure(name, name);
        });

        function configure(config, expected) {
          expected = expected || 'not specified';

          ns.weaponObj = weapon({
            name: config
          });

          assert.isObject(ns.weaponObj);
          assert.isFrozen(ns.weaponObj);
          assert.equal(ns.weaponObj.name, expected);
        }
      });
    });
  });

  function destroyWeaponObject() {
    delete ns.weaponObj;
  }

}());
