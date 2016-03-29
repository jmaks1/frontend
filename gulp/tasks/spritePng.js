/**
 * The task of create PNG sprite
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var taskName = path.basename(__filename, '.js');

var spritesmith = require('gulp.spritesmith');

module.exports = function(runTimestamp) {
    gulp.task(taskName + ((runTimestamp)?':production':''), function () {
        var spriteData =
            gulp.src(taskUrl(taskName, 'src'))
                .pipe(spritesmith({
                    imgName: 'sprite.png',
                    cssName: 'sprite.scss',
                    cssFormat: 'scss',
                    algorithm: 'binary-tree',
                    padding: 5,
                    cssTemplate: taskUrl(taskName, 'template'),
                    cssVarMap: function (sprite) {
                        sprite.name = 's-' + sprite.name
                    }
                }));

        spriteData.css.pipe(gulp.dest(taskUrl(taskName, 'core')));
        spriteData.img.pipe(gulp.dest(taskUrl(taskName, 'dist', runTimestamp)));
    });
};