"use strict";

/**
 * Home page
 * Require scripts
 */

var main = require('./assets/main');
var GJ = require('./assets/gj');

require('jquery_lazyload');
require('owl.carousel');

$(function() {
    main.init();

    var _slider = $('.owl-carousel');
    var _images = $('.lazyload');
    var _video  = $('.video-modal');
    if (_video.length > 0) {
        main.youtubeModal(_video);
    }

    _images.lazyload({
        failure_limit: 10,
        threshold : 100,
        skip_invisible : true,
        placeholder: "",
        appear: function() { $(this).removeClass('loader'); },
        load : function() {}
    });

    _slider.owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navText: ["<span class='fa fa-2x fa-caret-left'></span>", "<span class='fa fa-2x fa-caret-right'></span>"],
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoplaySpeed: 2000,
        smartSpeed: 500
    });

    function sliderLazy(image) {
        image.lazyload({
            placeholder: "",
            appear: function() {
                $(this).removeClass('loader');
            }
        });
    }

    // when sliding images
    /*
    _slider.on('translated.owl.carousel', function(event) {
        var element   = event.target;
        var item      = event.item.index;
        var imagePrev = $(element).find('.owl-item').eq(item - 1).find('.loader:visible');
        var imageCurr = $(element).find('.owl-item').eq(item).find('.loader:visible');
        var imageNext = $(element).find('.owl-item').eq(item + 1).find('.loader:visible');
        // lazyLoad for slider images
        if (imageCurr.length > 0) sliderLazy(imageCurr);
        if (imagePrev.length > 0) sliderLazy(imagePrev);
        if (imageNext.length > 0) sliderLazy(imageNext);
    });
    */
});

module.exports = GJ;