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

module.exports = function(runTimestamp) {
    gulp.task(taskName + ((runTimestamp)?':production':''), function () {
        return gulp.src(taskUrl(taskName, 'src'))
            .pipe(plumber())
            .pipe(gulpif(!runTimestamp, sourcemaps.init()))
            .pipe(sass())
            .pipe(prefixer())
            .pipe(cssmin())
            .pipe(gulpif(!runTimestamp, sourcemaps.write()))
            .pipe(plumber.stop())
            .pipe(gulp.dest(taskUrl(taskName, 'dist', runTimestamp)))
            .pipe(foreach(function(stream, file){
                mapping.add(file.history);
                return stream;
            })).on('end', function() {
                mapping.write((runTimestamp) ? 'prod' : 'dev');
            });
    });
};