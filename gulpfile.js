/* globals console, __dirname, require */
'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var fs = require('fs');
var header = require('gulp-header');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var karmaServer = require('karma').Server;

var CONST = {
	SRC_FOLDER: 'src',
	DIST_FOLDER: 'dist',
	DIST_FILENAME_JS: 'chordsWiki.js',
	MIN_SUFFIX: '.min.js',
	JS_SOURCE_FILES: [
		'src/js/chordsWiki.js',
		'src/js/WikiManager.js',
		'src/js/Wiki.js',
		'src/js/chordsData.js',
		'src/js/Keyboard.js'
	],
	SCSS_FOLDER: 'src/sass/*.scss'
};

function concatAndMinify(src, fileName){
	return gulp.src(src)
			.pipe(sourcemaps.init())
			.pipe(concat(fileName))
			// The 'changed' task needs to know the destination directory upfront
			.pipe(changed(CONST.DIST_FOLDER))
			.pipe(gulp.dest(CONST.DIST_FOLDER))
			.pipe(rename({
				extname: CONST.MIN_SUFFIX
			}))
			.pipe(uglify({
				mangle: false
			}))
			.pipe(sourcemaps.write('.', {
				includeContent: true,
				sourceRoot: '.'
			}))
			.pipe(gulp.dest(CONST.DIST_FOLDER));
}

/* Tasks */

gulp.task('coverage', function (done) {
	// Use Karma only for the sake of producing a code coverage report
	new karmaServer({
		configFile: __dirname + '/test/karma.conf.js'
	}, done).start();
});

gulp.task('scss', function(){
	gulp.src(CONST.SCSS_FOLDER)
			.pipe(sourcemaps.init())
			.pipe(sass.sync().on('error', sass.logError))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(CONST.DIST_FOLDER));
});

gulp.task('dist', function() {
	concatAndMinify(CONST.JS_SOURCE_FILES, CONST.DIST_FILENAME_JS);
});

gulp.task('default', function(callback){
	runSequence(
			'dist',
			'scss',
			function(error){
				if(error){
					console.log(error.message);
				}
				else{
					console.log('BUILD FINISHED SUCCESSFULLY');
				}
				callback(error);
			});
});

gulp.task('watch', function(){
	gulp.watch('src/sass/**/*.scss', ['scss']);
});