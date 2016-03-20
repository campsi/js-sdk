'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var b = watchify(browserify({entries: ['./index.js'], debug: false}));

gulp.task('default', ['bundle', 'compress']);

gulp.task('bundle', function bundle() {
    return b.bundle()
        .pipe(source('campsi-sdk.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('compress', function compress() {
    return b.bundle()
        .pipe(source('campsi-sdk.min.js'))
        .pipe(buffer())
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./dist'));
});