"use strict";

/**
 * Home page
 * Require scripts
 */

var main = require('./assets/main');
var GJ = require('./assets/gj');

require('jquery_lazyload');
require('owl.carousel');

function changeSlide(event) {
    var element = event.target;
    var item = event.item.index;
    var slide = {};
    var color = {};

    slide.prev = $(element).find('.owl-item').eq(item - 1).find('.owl-carousel__slide');
    slide.curr = $(element).find('.owl-item').eq(item).find('.owl-carousel__slide');
    slide.next = $(element).find('.owl-item').eq(item + 1).find('.owl-carousel__slide');

    color.prev = 'owl_' + slide.prev.data('color');
    color.curr = 'owl_' + slide.curr.data('color');
    color.next = 'owl_' + slide.next.data('color');

    // fix for initialized event
    setTimeout(function () {
        $(element).find('.owl-dots').removeClass(color.prev, color.next).addClass(color.curr);
        $(element).find('.owl-nav').removeClass(color.prev, color.next).addClass(color.curr);
    }, 1);
}

$(function () {
    main.init();

    var slider = $('.owl-carousel');


    // when initialized slider
    slider.on('initialized.owl.carousel', function (event) {
        changeSlide(event);
    });

    slider.owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navText: ["<span></span>", "<span></span>"],
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoplaySpeed: 1000,
        smartSpeed: 500
    });

    // when sliding images
    slider.on('translate.owl.carousel', function (event) {
        changeSlide(event);
    });

});

module.exports = GJ;