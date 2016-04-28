/*globals suite:false,test:false,setup:false,teardown:false*/
(function() {
  'use strict';

  var assert = require('./utils/assert.js'),
    utils = require('./utils/utils.js'),

    /// libs
    paperlib = require('../src/js/paper.js'),

    /// lib APIs
    paper = paperlib.paper,

    /// namespaced var to contain any tmp values created within setup (each
    /// of which can then be destroyed using delete within teardown)
    ns = {};

  suite('paperlib', function() {
    suite('$.paper factory function', function() {
      suite('$.paper(...)', function() {
        teardown('destroy paperObj', destroyPaperObject);

        test('ignores all invalid values/configurations and returns an immutable object', function() {
          var datatypesLen, i;

          datatypesLen = utils.datatypes.length;

          for (i = 0; i < datatypesLen; i += 1) {
            configure(utils.datatypes[i]);
          }
        });

        function configure(config) {
          ns.paperObj = paper(config);

          assert.isObject(ns.paperObj);
          assert.isFrozen(ns.paperObj);
        }
      });

      suite('$.paper().name', function() {
        teardown('destroy paperObj', destroyPaperObject);

        test('always returns "paper"', function() {
          ns.paperObj = paper({
            name: 'plastic'
          });
          assert.equal(ns.paperObj.name, 'paper');

          utils.throwImmutableTypeError(function() {
            ns.paperObj.name = 'plastic';
          });
          assert.equal(ns.paperObj.name, 'paper');
        });
      });

      suite('$.paper({defeats:...})', function() {
        teardown('destroy paperObj', destroyPaperObject);

        test('returns an immutable object', function() {
          var config = {
            rock: 'covers'
          };

          ns.paperObj = paper({
            defeats: config
          });
          assert.deepEqual(ns.paperObj.defeats, config);

          utils.throwImmutableTypeError(function() {
            delete ns.paperObj.defeats;
          });
          utils.throwImmutableTypeError(function() {
            ns.paperObj.defeats = {};
          });
          utils.throwImmutableTypeError(function() {
            delete ns.paperObj.defeats.rock;
          });
          utils.throwImmutableTypeError(function() {
            ns.paperObj.defeats.rock = 'wraps';
          });
          utils.throwImmutableTypeError(function() {
            ns.paperObj.defeats.otherWeapon = 'defeats';
          });

          assert.deepEqual(ns.paperObj.defeats, config);
        });
      });
    });
  });

  function destroyPaperObject() {
    delete ns.paperObj;
  }

}());
