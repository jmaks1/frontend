/**
 * Task for watching
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var taskName = path.basename(__filename, '.js');

var watch = require('gulp-watch');
var taskWatch = ['javascripts', 'spritePng', 'spriteSvg', 'icons', 'stylesheets'];

module.exports = function(runTimestamp) {
    gulp.task(taskName + ((runTimestamp)?':production':''), function () {
        taskWatch.forEach(function(item, i, arr) {
            watch([taskUrl(item, 'watch')], function(event, cb) {
                gulp.start(item);
            });
        });
    });
};