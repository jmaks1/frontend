"use strict";

/**
 * Product main file
 * Require scripts
 */

var main = require('./assets/main');
var GJ = require('./assets/gj');

require('jquery_lazyload');
//import "jquery_lazyload";

var images = $('.lazyload');

images.lazyload({
    failure_limit: 10,
    threshold : 100,
    skip_invisible : true,
    placeholder: "",
    appear: function() {
        $(this).removeClass('loader');
    },
    load : function() {

    }
});

/**
 * Catalog class
*/

$(function() {
    main.init();
});

exports.GJ = Object.create(GJ);