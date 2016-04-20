/**
 * Task for clearing develop build
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var taskName = path.basename(__filename, '.js');

var plumber = require('gulp-plumber');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

module.exports = function (build) {
    gulp.task(taskName + ((build) ? ':production' : ''), function () {
        return gulp.src(taskUrl(taskName, 'src'))
            .pipe(plumber())
            .pipe(imageResize({width: '100%'}))
            .pipe(imagemin({
                progressive: true,
                interlaced: true,
                use: [pngquant()]
            }))
            .pipe(plumber.stop())
            .pipe(gulp.dest(taskUrl(taskName, 'dist', build)));
    });
};
