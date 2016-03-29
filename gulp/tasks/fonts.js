/**
 * Task for clearing develop build
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var taskName = path.basename(__filename, '.js');

var plumber = require('gulp-plumber');


module.exports = function(runTimestamp) {
    gulp.task(taskName + ((runTimestamp)?':production':''), function () {
        return gulp.src(taskUrl(taskName, 'src'))
            .pipe(gulp.dest(taskUrl(taskName, 'dist', runTimestamp)));
    });
};