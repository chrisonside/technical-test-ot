# Chris Reidy - OpenTable developer task, project notes

## Working on the project - dev dependencies

This project uses the task runner Gulp to help with dev tasks and code preparation.

For the Gulp tasks to work, you'll need to have [Node.js](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/) installed on your computer.

So first you need to clone [the project](https://github.com/chrisonside/technical-test-ot) from Github:

	`git clone https://github.com/chrisonside/technical-test-ot`;

Now you've cloned the project, simply `cd` into the project directory and run `npm install` to install the dev dependencies.

### Gulp commands

Running the default `gulp` command will:

* Spin up a [Browser-sync](https://www.npmjs.com/package/browser-sync) web server
* Watch your SASS, JS and index.html for changes
* Auto-prefix your CSS
* Use Babel to transform any ES2015 JavaScript so that older browsers can understand it
* Create source maps

Running the `gulp deploy` task will also compress/minify your CSS/JS files so that they are ready for production, and add cachebuster strings to your CSS and JS file references in your index.html file.

## SASS notes

I use one SASS mixin not written by me - this is a REM mixin with pixel fallback by [Eduardo Boucas](https://github.com/eduardoboucas/).

## Testing

I have tested the site in:

* Chrome, Safari & Firefox on a Mac
* Edge, Chrome and Firefox on a PC
* Samsung browser and Chrome on Android

## Image notes

I compressed the image assets using <https://tinypng.com/>. PNG waiter icon by [Stefania Servidio](https://thenounproject.com/search/?q=waiter&i=101854).

## Next steps

* Further testing - I wasn't able to test in IOS just yet, so I'd start there. 
* IE11 - I had a brief test in IE11 and some edits to the code would be required for this app to work well in IE11. 
* My Gulpfile could do with a refresh - I'd look at adding a JS Linter, updating the Babel preset, and adding Pally to help flag accessibility issues with my code.
* The menu/form validation could also be tweaked further - currently Pierre the waiter gets triggered if any of the diners order the Salmon Fillet and Prawn Cocktail between them. So I'd likely calm Pierre down by only triggering him when one person has ordered that combination themselves.
* Also on the validation front, I'd add a visual error state to the form, so that people on mobile devices didn't only realise there was an error when they'd scrolled to the submit button section.
* I'd revisit the JavaScript to tidy up some of the functions - there is the odd hard-coded value floating around and it'd be good to make them as generic and reusable as possible.
* On a final note, I'd be keen to look over the functions again to make them as pure as possible, and then play about with putting Mocha into the default Gulp task, to run a few unit tests automatically during dev work, to make sure my functions still pass tests.