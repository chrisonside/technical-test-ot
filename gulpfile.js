// Initialize all of our variables
var autoprefixer, babel, browserSync, concat, gulp, gutil, minifyCSS, plumber, sass, sourceMaps, uglify;

// Set up autoprefixer options
var autoPrefixBrowserList = ['last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'iOS >= 6', 'android 4'];

// Load all of our dependencies
gulp        = require('gulp');
gutil       = require('gulp-util');
concat      = require('gulp-concat');
babel		= require('gulp-babel');
uglify      = require('gulp-uglify');
sass        = require('gulp-sass');
sourceMaps  = require('gulp-sourcemaps');
minifyCSS   = require('gulp-cssmin');
browserSync = require('browser-sync');
autoprefixer = require('gulp-autoprefixer');
plumber     = require('gulp-plumber');

// Config which js script files to include in my concatonation
var scriptFiles = ['js/vendor/*.js', '!js/vendor/html5shiv.min.js', 'js/modules/**/*.js', 'js/main.js'];

// Set up BrowserSync task
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

// Concat my JavaScript files
gulp.task('scripts', function() {
	// grab dev Scripts
	return gulp.src(scriptFiles)
		.pipe(sourceMaps.init())
		// Prevent pipe breaking caused by errors from gulp plugins
		.pipe(plumber())
		// Run Babel compiler to transform ES2105 JavaScript into something supported by older browsers  
		.pipe(babel({
            presets: ['es2015']
        }))
		// This will be name of our concatonated JS file
		.pipe(concat('main.js'))
		// Write the Sourcemap
		.pipe(sourceMaps.write('.'))
		// Where we will store our concatonated script
		.pipe(gulp.dest('dist/js'))
		// Catch errors
		.on('error', gutil.log)
		// Notify browserSync to refresh
		.pipe(browserSync.reload({stream: true}));
});

// Prep JavaScript files for deployment - concat + uglification
gulp.task('scripts-deploy', function() {
	return gulp.src(scriptFiles)
		.pipe(plumber())
		.pipe(babel({
            presets: ['es2015']
        }))
		.pipe(concat('main.js'))
		// Compress the JS
		.pipe(uglify())
		//where we will store our finalized, compressed script
		.pipe(gulp.dest('dist/js'));
});

// Compiling SCSS files
gulp.task('styles', function() {
	// master SCSS file that imports everything
	return gulp.src('./sass/main.scss')
		//prevent pipe breaking caused by errors from gulp plugins
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		// Get sourceMaps ready
		.pipe(sourceMaps.init())
		// Include SCSS and list every "include" folder
		.pipe(sass({
			errLogToConsole: true,
			includePaths: [
				'sass/'
			]
		}))
		.pipe(autoprefixer({
			browsers: autoPrefixBrowserList,
			cascade:  true
		}))
		// Catch errors
		.on('error', gutil.log)
		// The final filename of our combined css file
		.pipe(concat('main.css'))
		// get our sources via sourceMaps
		.pipe(sourceMaps.write())
		// Location of compressed css file
		.pipe(gulp.dest('dist/css'))
		// Notify browserSync to refresh
		.pipe(browserSync.reload({stream: true}));
});

// Compile SCSS files for deployment
gulp.task('styles-deploy', function() {
	return gulp.src('sass/main.scss')
		.pipe(plumber())
		.pipe(sass({
			includePaths: [
				'sass/'
			]
		}))
		.pipe(autoprefixer({
			browsers: autoPrefixBrowserList,
			cascade:  true
		}))
		.pipe(concat('main.css'))
		// Also run it through minify CSS this time
		.pipe(minifyCSS())
		//where to save our final, compressed css file
		.pipe(gulp.dest('dist/css'));
});

// This is our master task when you run `gulp` in CLI / Terminal
// So this default task:
// spins up a browserSync web server for your dev work
// keeps an eye out for if you update JS, CSS or the index.html page
// compresses all scripts and SCSS files. BrowserSynch refreshes accordingly.
gulp.task('default', ['browserSync', 'scripts', 'styles'], function() {
	// A list of watchers:
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('index.html', browserSync.reload);
});

// This is our deployment task, which uglifies/minifies our files ready for production
gulp.task('deploy', ['scripts-deploy', 'styles-deploy']);