# Chris Reidy - OpenTable developer task, project notes

##Working on the project - dev dependencies

This project uses the task runner Gulp to help with dev tasks and code preparation.

For the Gulp tasks to work, you'll need to have [Node.js](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/) installed on your computer.

So first you need to clone [the project](https://github.com/chrisonside/technical-test-ot) from Github - `git clone https://github.com/chrisonside/technical-test-ot`;

Now you've cloned the project, simply `cd` into the project directory and run `npm install` to install the dev dependencies.

###Gulp commands

Running the default `gulp` command will:

* Spin up a [Browser-sync](https://www.npmjs.com/package/browser-sync) web server
* Watch your SASS, JS and index.html for changes
* Auto-prefix your CSS
* Use Babel to transform any ES2015 JavaScript so that older browsers can understand it
* Create source maps

Running the `gulp deploy` task will also compress/minify your CSS/JS files so that they are ready for production, and add cachebuster strings to your CSS and JS file references in your index.html file.

##SASS notes

I use one SASS mixin not written by me - this is a REM mixin with pixel fallback by [Eduardo Boucas](https://github.com/eduardoboucas/).

##Testing

I have tested the site in:

* Chrome, Safari & Firefox on a Mac
* Chrome and Firefox on a PC
* IE 11 & Edge
* Chrome on IOS, Safari on IOS
* Samsung browser and Chrome on Android

##Image notes

I compressed the image assets using <https://tinypng.com/>. PNG waiter icon by [Stefania Servidio](https://thenounproject.com/search/?q=waiter&i=101854).

##Next steps


