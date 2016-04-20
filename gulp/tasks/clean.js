/**
 * Task for clearing develop build
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var taskName = path.basename(__filename, '.js');
var del = require('del');

module.exports = function(taskClean, type) {
    gulp.task(taskName + ((type) ? (":" + type) : ''), function () {
        var arrUrl = [];
        taskClean.forEach(function(item, i, arr) {
            arrUrl.push(taskUrl(item, 'dist'));
        });

        return del(arrUrl);
    });
};
