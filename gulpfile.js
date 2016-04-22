/**
 * Main gulp file
 */
'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var gulpSequence = require('gulp-sequence'); // Multiple startup tasks
var requireDir = require('require-dir'); // Automatic connection files
var build = Math.round(Date.now() / 1000); // build number
var task = requireDir('./gulp/tasks', { recurse: true }); // Require all tasks in gulp/tasks
var mapping = require('./gulp/lib/mapping');


/**
 * Init all development tasks
 */
task.clean(['fonts', 'images'], 'static');
task.fonts();
task.images();
task.spritePng();
task.spriteSvg();
task.icons();

task.javascripts();
task.stylesheets();
task.clean(['javascripts']);
task.watch(['javascripts', 'stylesheets', 'images']);

/**
 * Init all production tasks
 */
task.fonts(build);
task.images(build);
task.spritePng(build);
task.spriteSvg(build);
task.icons(build);
task.javascripts(build);
task.stylesheets(build);


/**
 * task kit
 */

gulp.task('development:static', function (cb) {
    gulpSequence(
        'clean:static',
        'fonts',
        'images',
        'spritePng',
        'spriteSvg',
        'icons'
    )(cb);
});

gulp.task('development', function (cb) {
    mapping.clear('dev');
    gulpSequence(
        'clean',
        'javascripts',
        'stylesheets',
        'watch'
    )(cb);
});

gulp.task('production', function (cb) {
    mapping.clear('prod');
    gutil.log(gutil.colors.red('build_' + build));
    gulpSequence(
        'fonts:production',
        'images:production',
        'spritePng:production',
        'spriteSvg:production',
        'icons:production',
        'javascripts:production',
        'stylesheets:production'
    )(cb);
});