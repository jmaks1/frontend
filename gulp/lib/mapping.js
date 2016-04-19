'use strict';

var fs = require('fs');
var config = require('../config');
var map = {};

module.exports = function(fileName, filePath) {

    fs.access(config.map, fs.F_OK, function(err) {
        if (!err) {
            map = JSON.parse(fs.readFileSync(config.map, 'utf8'));
        } else {
            console.log(err);
        }
    });


    map[fileName] = filePath;

    fs.writeFileSync(config.map, JSON.stringify(map, null, 4));
};
