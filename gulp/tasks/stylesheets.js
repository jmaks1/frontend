/**
 * Task for styles
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var mapping = require('../lib/mapping');
var taskName = path.basename(__filename, '.js');

var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
var foreach = require('gulp-foreach');

module.exports = function(build) {
    gulp.task(taskName + ((build)?':production':''), function () {
        return gulp.src(taskUrl(taskName, 'src'))
            .pipe(plumber())
            .pipe(gulpif(!build, sourcemaps.init()))
            .pipe(sass())
            .pipe(prefixer())
            .pipe(cssmin())
            .pipe(gulpif(!build, sourcemaps.write()))
            .pipe(plumber.stop())
            .pipe(gulp.dest(taskUrl(taskName, 'dist', build)))
            .pipe(foreach(function(stream, file){
                mapping.add(file.history);
                return stream;
            })).on('end', function() {
                mapping.write((build) ? 'prod' : 'dev');
            });
    });
};