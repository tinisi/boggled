# boggled

A Boggle solving, full stack web application.

## Setup

* Clone the repo
* Install or otherwise make available Node 5.11.0 (others will probably work, I use nodenv to avoid system installs)
* cd into the project
* run `npm install`
* cd into `api-server`
* run `npm install`

## Testing and Development of client code and server code

* `npm test` will run the jasmine specs
* `npm start` will kick off the wepack dev server, access the client at `localhost:5000`
* open a second terminal, cd into the folder `api-server` and type `npm start`, this will start the express server locally and xhr calls from client should work, you can access the server directly at `localhost:3000`
* `npm run build` will build to the dist folder
* `npm run repl` will get you into the groovy babel-node REPL, with the ES6 polyfill in scope.

Thanks to the babel test helper, jasmine is automatically transpiling the source code, so TDD is easy. And, the webpack dev server with hot module loading makes local development dreamy.

## To build and run the docker stack

The current configuration of this is not useful for development, there are no local drives mapped for source code. So, you need to prep the static assets first with the webpack build and they will be copied over to the nginx container.

* run `npm run build` in top level project
* `docker-compose build`
* `docker-compose up`
* access the site at localhost on port 80
