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
      it('handles empty/incorrect input "opts"', function() {
        var opts = [
          undefined,
          null,
          {},
          [],
          'string',
          4,
          Number.NaN,
          false,
          function() { return true; }
        ],
        i,
        optsLen = opts.length;

        for (i = 0; i < optsLen; i += 1) {
          utils.incorrectFactoryInvocation(opts[i], weapon, 'weaponlib');
        }
      });

      it('handles incorrectly configured input "opts"', function() {
        var opts = [
          /// incorrect opts.name
          {
            name: 4
          },

          /// incorrect opts.defeats
          {
            name: 'correct'
          }
        ],
        i,
        optsLen = opts.length;

        for (i = 0; i < optsLen; i += 1) {
          utils.incorrectFactoryInvocation(opts[i], weapon, 'weaponlib');
        }
      });

      it('returns an immutable object', function() {
        var opts = {
            name: 'Paper',
            defeats: {
              'Rock': 'covers'
            }
          },
          p = weapon(opts);

        assert.throws(
          function() {
            p.name = 'Rock';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "weapon.name" should throw an error'
        );

        assert.throws(
          function() {
            p.defeats.Spock = 'disproves';
          },
          TypeError,
          utils.immutableTypeErrorRegExp,
          'attempting to modify "weapon.defeats" should throw an error'
        );

        assert.deepEqual(p, opts, 'modifications to weapon properties should not be possible');
      });
    });
  });
}());
