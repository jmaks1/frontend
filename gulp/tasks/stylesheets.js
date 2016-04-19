/**
 * Task for styles
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var taskName = path.basename(__filename, '.js');

var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');



var foreach = require('gulp-foreach');
var mapping = require('../lib/mapping');
var route = {};

module.exports = function(runTimestamp) {
    gulp.task(taskName + ((runTimestamp)?':production':''), function () {
        return gulp.src(taskUrl(taskName, 'src'))
            .pipe(foreach(function(stream, file){

                for(var propName in file) {
                    var propValue = file[propName];
                    //console.log('name:' + propName, ', value:<<<',propValue,'>>>');
                }
                console.log(file.relative);
                //mapping(file.path, )
                return stream;
            }))
            .pipe(plumber())
            .pipe(gulpif(!runTimestamp, sourcemaps.init()))
            .pipe(sass())
            .pipe(prefixer())
            .pipe(cssmin())
            .pipe(gulpif(!runTimestamp, sourcemaps.write()))
            .pipe(plumber.stop())
            .pipe(foreach(function(stream, file){

                for(var propName in file) {
                    var propValue = file[propName];
                    console.log('name:' + propName, ', value:<<<',propValue,'>>>');
                }
                console.log(file.relative);
                //mapping(file.path, )
                return stream;
            }))
            .pipe(gulp.dest(taskUrl(taskName, 'dist', runTimestamp)));
    });
};