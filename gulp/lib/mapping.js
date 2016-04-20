'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var config = require('../config');

module.exports = {
    map: {},

    /**
     * Check separator in url
     * @param string
     * @returns {string}
     */
    getSeparator: function(string) {
        var separator = '';
        if (string.indexOf('\\') !== -1) {
            separator = '\\';
        } else if (string.indexOf('/') !== -1) {
            separator = '/';
        }

        return separator;
    },

    /**
     * Add route to Map before write
     * @param history
     */
    add: function(history, task) {

        var src = history[0];
        var dist = history[history.length - 1];

        src = _.split(src, this.getSeparator(src));
        src = _.dropWhile(src, function(o) { return !(o === 'src'); });
        // drop src category from name of route
        src = _.drop(src);
        src = _.join(src, '/');

        dist = _.split(dist, this.getSeparator(dist));
        dist = _.dropWhile(dist, function(o) { return !(o === 'public'); });
        dist = _.join(dist, '/');

        // todo: for production need another way to give dist
        if (task && task in config.tasks && history[history.length - 1].indexOf(config.tasks[task].publicPath) !== -1) {
            dist = history[history.length - 1];
        }

        if (src && dist) {
            this.map[src] = dist;
        }
    },

    /**
     * Clear mapping file
     * @param env
     */
    clear: function(env) {
        var url = path.join(__dirname, _.replace(config.mapping, '{env}', env));

        fs.access(url, fs.F_OK, function(err) {
            if (!err) {
                fs.unlinkSync(url);
            }
        });
    },

    /**
     * Write mapping
     * @param env
     */
    write: function (env) {
        var self = this;
        var url = path.join(__dirname, _.replace(config.mapping, '{env}', env));

        fs.access(url, fs.F_OK, function(err) {
            if (!err) {
                _.merge(self.map, JSON.parse(fs.readFileSync(url, 'utf8')));
            }
            fs.writeFileSync(url, JSON.stringify(self.map, null, 4));
        });
    }
};