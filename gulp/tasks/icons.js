/**
 * Task for create icons font
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var taskUrl = require('../lib/createUrl');
var taskName = path.basename(__filename, '.js');

var plumber = require('gulp-plumber');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

module.exports = function(runTimestamp) {
    gulp.task(taskName + ((runTimestamp)?':production':''), function () {
        return gulp.src(taskUrl(taskName, 'src'))
            .pipe(iconfont({
                fontName: 'GloriaJeans',
                formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
                normalize: true,
                fontHeight: 1001,
                timestamp: runTimestamp || Math.round(Date.now() / 1000)
            }))
            .on('glyphs', function (glyphs, options) {
                gulp.src(taskUrl(taskName, 'template'))
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs.map(function (glyph) {
                            // this line is needed because gulp-iconfont has changed the api from 2.0
                            return {
                                name: glyph.name,
                                codepoint: glyph.unicode[0].charCodeAt(0)
                            }
                        }),
                        fontName: 'GloriaJeans',
                        fontPath: '../fonts/',
                        className: 'gj'
                    }))
                    .pipe(gulp.dest(taskUrl(taskName, 'core')));
            })
            .pipe(gulp.dest(taskUrl(taskName, 'dist', runTimestamp)));
    });
};