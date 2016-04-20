/**
 * Task for watching
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var taskName = path.basename(__filename, '.js');

var watch = require('gulp-watch');
var gutil = require('gulp-util');

module.exports = function(taskWatch) {
    gulp.task(taskName, function () {
        taskWatch.forEach(function(item, i, arr) {
            watch([taskUrl(item, 'watch')], function(event, cb) {
                gulp.start(item);
            });
        });

        // i'm watching for you!
        var message =
            '___/\\                         __         .__    .__                   _____                                  ._. \n' +
            '|   )/_____   __  _  _______ _/  |_  ____ |  |__ |__| ____    ____   _/ ____\\___________   ___.__. ____  __ __| | \n' +
            '|   |/     \\  \\ \\/ \\/ /\\__  \\\\   __\\/ ___\\|  |  \\|  |/    \\  / ___\\  \\   __\\/  _ \\_  __ \\ <   |  |/  _ \\|  |  \\ | \n' +
            '|   |  Y Y  \\  \\     /  / __ \\|  | \\  \\___|   Y  \\  |   |  \\/ /_/  >  |  | (  <_> )  | \\/  \\___  (  <_> )  |  /\\| \n' +
            '|___|__|_|  /   \\/\\_/  (____  /__|  \\___  >___|  /__|___|  /\\___  /   |__|  \\____/|__|     / ____|\\____/|____/ __ \n' +
            '          \\/                \\/          \\/     \\/        \\//_____/                         \\/                  \\/\n';

        gutil.log('\n\n', gutil.colors.yellow(message), '\n');
    });
};