var gulp 			= require('gulp');
var fs 				= require("fs");
var browserify 		= require("browserify");
var babelify 		= require("babelify");
var source 			= require('vinyl-source-stream');
var gutil 			= require('gulp-util');
var uglify       	= require('gulp-uglify-es').default;
var concat       	= require('gulp-concat');
var sass         	= require('gulp-sass');
var sourceMaps   	= require('gulp-sourcemaps');
var minifyCSS   	= require('gulp-cssmin');
var browserSync 	= require('browser-sync');
var autoprefixer 	= require('gulp-autoprefixer');
var gulpSequence 	= require('gulp-sequence').use(gulp);
var shell       	= require('gulp-shell');
var plumber     	= require('gulp-plumber');
var replace 		= require('gulp-replace');
var psi         	= require('psi');
var buffer 			= require('vinyl-buffer');
var streamify 		= require('gulp-streamify');

// Configure autoprefixer
var autoPrefixBrowserList = ['last 2 versions', 'safari 5', 'ie 9', 'opera 12.1', 'iOS >= 6', 'android 4'];

// Set up BrowserSync task
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

// Props to https://raw.githubusercontent.com/jpsierens/es6-babel6/master/gulpfile.js
// Babel - converts ES6 code to ES5 - however it doesn't handle imports.
// Browserify - crawls your code for dependencies and packages them up into one file. can have plugins.
// Babelify - a babel plugin for browserify, to make browserify handle es6 including imports.
gulp.task('es6', function() {
	browserify({ debug: true })
	.transform("babelify", {presets: ["es2015"]})
	.require("./js/main.js", { entry: true })
	.bundle()
	.on('error',gutil.log)
	.pipe(source('build.js'))
	.pipe(gulp.dest('./dist/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('es6-deploy', function() {
	browserify({ debug: true })
	.transform("babelify", {presets: ["es2015"]})
	.require("./js/main.js", { entry: true })
	.bundle()
	.on('error',gutil.log)
	.pipe(source('build.js'))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest('./dist/js'))
	.pipe(browserSync.reload({stream: true}));
});

//compiling our SCSS files
gulp.task('styles', function() {
	// master SCSS file, which will just be a file that imports everything
	return gulp.src('./sass/main.scss')
	//prevent pipe breaking caused by errors from gulp plugins
	.pipe(plumber({
		errorHandler: function (err) {
		console.log(err);
		this.emit('end');
		}
	}))
	//get sourceMaps ready
	.pipe(sourceMaps.init())
	//include SCSS and list every "include" folder
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
	//catch errors
	.on('error', gutil.log)
	//the final filename of our combined css file
	.pipe(concat('main.css'))
	//get our sources via sourceMaps
	.pipe(sourceMaps.write())
	//where to save our final, compressed css file
	.pipe(gulp.dest('./dist/css'))
	//notify browserSync to refresh
	.pipe(browserSync.reload({stream: true}));
});

//compiling our SCSS files for deployment
gulp.task('styles-deploy', function() {
//the initializer / master SCSS file, which will just be a file that imports everything
return gulp.src('./sass/main.scss')
	.pipe(plumber())
	//include SCSS includes folder
	.pipe(sass({
	includePaths: [
		'sass/'
	]
	}))
	.pipe(autoprefixer({
		browsers: autoPrefixBrowserList,
		cascade:  true
	}))
	//the final filename of our combined css file
	.pipe(concat('main.css'))
	.pipe(minifyCSS())
	//where to save our final, compressed css file
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('cache-bust-deploy', function() {
	var cacheBuster = '?date=' + getDateString();
	gutil.log('cache bust running');
	gulp.src('index.html')
	.pipe(replace(/\/dist\/js\/build.js.*>/g, '/dist/js\/build.js' + cacheBuster + '"></script>'))
	.pipe(replace(/\/dist\/css\/main.css.*>/g, '/dist/css\/main.css' + cacheBuster + '" />'))
	.pipe(gulp.dest('./')); //Write the file back to the same spot.
});

function getDateString() {
	var date = new Date();
	var monthInt = date.getMonth() + 1;
	var monthString = monthInt.toString();
	if (monthString.length === 1) monthString = '0' + monthString;
	return date.getDate() + '-' + monthString + '-' + date.getFullYear() + '-' + Date.now();
}

gulp.task('default', ['browserSync', 'es6', 'styles'], function() {
//a list of watchers, so it will watch all of the following files waiting for changes
gulp.watch('./js/**/*.js', ['es6']);
gulp.watch('./sass/**/*.scss', ['styles']);
gulp.watch('index.html', browserSync.reload);
});

//this is our deployment task, it will set everything for deployment-ready files
gulp.task('deploy', gulpSequence(['es6-deploy', 'styles-deploy'], 'cache-bust-deploy'));