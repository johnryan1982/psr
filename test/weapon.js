/*globals describe:false,it:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    weaponlib = require('../src/js/weapon.js'),

    /// lib APIs
    weapon = weaponlib.weapon;

  describe('weaponlib', function() {
    describe('#weaponlib API', function() {
      /// static, immutable properties
      it('has a static "weapon" factory function', function() {
        assert.isFunction(weaponlib.weapon);

        assert.throws(
          function() {
            weaponlib.weapon = false;
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "weaponlib.weapon" should throw an error'
        );
      });
    });

    describe('#factory method object construction', function() {
      it('#handles empty/incorrect input "opts"', function() {
        var opts, optsLen, i;

        opts = [
          undefined, null, {}, [], 'string', 4, Number.NaN, false, function() { return true; }
        ];
        optsLen = opts.length;

        for (i = 0; i < optsLen; i += 1) {
          utils.incorrectFactoryInvocation(opts[i], weapon, 'weaponlib');
        }
      });

      it('#handles incorrectly configured input "opts"', function() {
        var opts, optsLen, i;

        opts = [
          { name: 4 }, /// incorrect opts.name
          { name: 'correct' } /// incorrect opts.defeats
        ];
        optsLen = opts.length;

        for (i = 0; i < optsLen; i += 1) {
          utils.incorrectFactoryInvocation(opts[i], weapon, 'weaponlib');
        }
      });

      it('#returns a (weaponObj) object from "opts"', function() {
        var opts, paperObj;

        opts = {
          name: 'Paper',
          defeats: {
            'Rock': 'covers'
          }
        };
        paperObj = weapon(opts);

        assert.throws(
          function() {
            paperObj.name = 'Rock';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "weaponObj.name" should throw an error'
        );

        assert.throws(
          function() {
            paperObj.defeats.Spock = 'disproves';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "weaponObj.defeats" should throw an error'
        );

        assert.deepEqual(paperObj, opts, 'modifications to weaponObj properties should not be possible');
      });
    });
  });
}());
