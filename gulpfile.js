'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');

var b = watchify(browserify({entries: ['./index.js'], debug: false}));

gulp.task('default', ['watch', 'bundle', 'compress']);

gulp.task('watch', function () {
    gulp.watch('**/*.styl', ['stylus']);
});
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

gulp.task('stylus', function () {
    gulp.src('./examples/arezzo/main.styl')
        .pipe(stylus({
            compress: false,
            'include css': true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./examples/arezzo'));
});
