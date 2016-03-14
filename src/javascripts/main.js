"use strict";

/**
 * Require defaults
 */

var GJ = require('./assets/gj');
var User = require('./assets/user');
var main = require('./assets/main');

GJ.user = User;

$(function() {
    main.init();
});

module.exports = GJ;