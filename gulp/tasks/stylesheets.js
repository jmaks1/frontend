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
var sass = require('gulp-sass'); // ƒл€ компил€ции нашего SCSS кода
var sourcemaps = require('gulp-sourcemaps'); // ƒл€ генерации css sourscemaps, помогает нам при отладке кода
var prefixer = require('gulp-autoprefixer'); // јвтоматически добавл€ет вендорные префиксы к CSS свойствам
var cssmin = require('gulp-minify-css'); // —жатие CSS кода


module.exports = function(runTimestamp) {
    // if get runTimestamp set mode production
    taskName += (runTimestamp) ? ':production' : '';

    gulp.task(taskName, function () {
        return gulp.src(taskUrl('stylesheets', 'src'))
            .pipe(plumber())
            .pipe(gulpif(!runTimestamp, sourcemaps.init()))
            .pipe(sass())
            .pipe(prefixer())
            .pipe(cssmin())
            .pipe(gulpif(!runTimestamp, sourcemaps.write()))
            .pipe(plumber.stop())
            .pipe(gulp.dest(taskUrl('stylesheets', 'dist', runTimestamp)));
    });
};