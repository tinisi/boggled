# boggled

A Boggle solving, full stack web application.

## Setup

* Clone the repo
* Install or otherwise make available Node 5.11.0 (others will probably work, I use nodenv to avoid system installs)
* cd into the project
* run `npm install`

## Testing and Development

* `npm test` will run the jasmine specs
* `npm start` will kick off the AMAZING webpack dev server (try it, you'll like it!)
* `npm run build` will build to the dist folder
* `npm run repl` will get you into the groovy babel-node REPL, with the ES6 polyfill in scope.

Thanks to the babel test helper, jasmine is automatically transpiling the source code, so TDD is easy. And, the webpack dev server with hot module loading makes local development dreamy.
