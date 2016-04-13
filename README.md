# node-project-scaffold

This repository will act as a Node.js project scaffold that can be easily forked/cloned.

## Installed modules

### JavaScript
* file linting ([JSHint](https://www.npmjs.com/package/jshint))
* code styling ([JavaScript Code Style](https://www.npmjs.com/package/jscs))
* file minification ([uglify-js](https://www.npmjs.com/package/uglify-js))
* test framework ([Mocha](https://www.npmjs.com/package/mocha))
* code coverage ([Istanbul](https://www.npmjs.com/package/istanbul))
* test runner ([Karma](https://www.npmjs.com/package/karma))
* browserify ([browserify](https://www.npmjs.com/package/browserify))
* assertion library ([chai](http://chaijs.com/guide/styles/#assert))

### CSS
* pre-processor ([less](https://www.npmjs.com/package/less))
* file minification ([less-plugin-clean-css](https://www.npmjs.com/package/less-plugin-clean-css))

### Other
* generic file watching utility ([watch](https://www.npmjs.com/package/watch))
* Unix-like cross-platform utilities:
  * cat ([jscat](https://www.npmjs.com/package/jscat))
  * clear ([clear-cli](https://www.npmjs.com/package/clear-cli)) (referenced in `package.json` using relative path so as not to clash with 'actual' Unix `clear` utility)
  * mkdir ([mkdirp](https://www.npmjs.com/package/mkdirp))
  * rm ([rimraf](https://www.npmjs.com/package/rimraf))
  * sed ([replace](https://www.npmjs.com/package/replace))
* add pre-commit and pre-push git hooks, and attach to `npm install`
* http-server ([http-server](https://www.npmjs.com/package/http-server))

## Scripts

`npm run watch -s`: realtime coverage reports against all JS (`src/vendor`, `src/js` and `test`)

`npm run watch:css -s`: watch LESS files and process as CSS

`npm run serve -s`: serve `dist/` on http://localhost:8888

`./node_modules/.bin/karma start karma.conf.js`: serve karma scripts on http://localhost:9876

A full list of all `npm` scripts is available using `npm run -T`.

## git hooks

### pre-commit

All commits are dependent on successfully completing the following:

* JS code linting, style checking, testing, browserfying and minification;
* full JS test coverage; and
* generating CSS from LESS.
