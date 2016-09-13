
// since this is an app, it should be kosher to include this
// even though it most defeinitely changes global vars
require('babel-polyfill');

require('whatwg-fetch');

var boggled = {};
boggled.App = require('./app.js').default;
boggled.app = new boggled.App();

document.addEventListener('DOMContentLoaded', function() {
  boggled.app.init();
});
