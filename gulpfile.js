var gulp   = require('gulp'),
		less   = require('gulp-less'),
		uglify = require('gulp-uglify'),
		prefix = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		sync   = require('browser-sync'),
		reload = sync.reload,
		handleErrors = require('./handleErrors'),
		sourcemaps = require('gulp-sourcemaps'),
		rename = require('gulp-rename'),
		minifyCSS = require('gulp-minify-css');

var src  = './src'
		dist = './dist',
		demo = './examples'

gulp.task('browser-sync', function() {
	sync({
		server: {
			baseDir: ['./examples', './']
		}
	});
});

gulp.task('build-js', function() {
	return gulp.src([src+'/localcart.*.js', src+'/localcart.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('localcart.js'))
		.pipe(gulp.dest(dist))
		.pipe(uglify())
		.on('error', handleErrors)
		.pipe(rename('localcart.min.js'))
		.pipe(gulp.dest(dist))
		.pipe(reload({stream:true}));
});

gulp.task('build-less', function() {
	return gulp.src(src+'/*.less')
		.pipe(less())
		.on('error', handleErrors)
		.pipe(prefix())
		.pipe(gulp.dest(dist))
		.pipe(minifyCSS())
		.pipe(rename('localcart.min.css'))
		.pipe(gulp.dest(dist))
		.pipe(reload({stream:true}));
});

gulp.task('compile-examples', function() {
	return gulp.src(demo+'/less/*.less')
		.pipe(less())
		.on('error', handleErrors)
		.pipe(prefix())
		.pipe(gulp.dest(demo+'/css'))

		.pipe(reload({stream:true}));
});


gulp.task('default', ['build-js', 'build-less', 'compile-examples', 'browser-sync'], function () {
    gulp.watch(demo+"/*", ['compile-examples']);
    gulp.watch(src+"/*",  ['build-js','build-less']);
});