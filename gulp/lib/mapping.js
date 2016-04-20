'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var config = require('../config');
var map = {};

module.exports = {

    /**
     * Add route to Map before write
     * @param history
     */
    add: function(history) {
        console.log(history);
        var src = _.split(history[0], '\\');
        var dist = _.split(history[history.length - 1], '\\');

        src = _.dropWhile(src, function(o) { return !(o === 'src'); });
        src = _.drop(src);
        src = _.join(src, '/');

        dist = _.dropWhile(dist, function(o) { return !(o === 'public'); });
        dist = _.join(dist, '/');

        map[src] = dist;
    },
    /**
     * Clear mapping
     * @param env
     */
    clear: function(env) {
        var url = path.join(__dirname, _.replace(config.mapping, '{env}', env));

        fs.unlinkSync(url);
    },

    /**
     * Write mapping
     * @param env
     */
    write: function (env) {
        var url = path.join(__dirname, _.replace(config.mapping, '{env}', env));

        console.log(map);
        fs.access(url, fs.F_OK, function(err) {
            if (!err) {
                _.merge(map, JSON.parse(fs.readFileSync(url, 'utf8')));
                fs.writeFileSync(url, JSON.stringify(map, null, 4));
            } else {
                fs.writeFileSync(url, JSON.stringify(map, null, 4));
            }
        });
    }
};