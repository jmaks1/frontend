'use strict';

var path = require('path');
var config = require('../config');
var map = require('./mapping');

module.exports = function(task, type, runTimestamp) {
    var res = false;
    var url = [];

    // check task in config
    if (task in config.tasks && type in config.tasks[task]) {
        // forming url array
        url.push((type in config.root) ? config.root[type] : config.root.baseDir);
        if (type === 'dist') url.push((runTimestamp) ? 'build_' + runTimestamp : 'build');
        url.push(config.tasks[task][type]);

        res = path.join.apply(null, url);
    }

    return res;
};