"use strict";

/**
 * Product main file
 * Require scripts
 */
var main = require('./assets/main');
var GJ = require('./assets/gj');

require('jquery-zoom');
require('owl.carousel');

//import 'jquery-zoom';
//import 'owl.carousel';

/**
 * Product class
 */
function Product() {
    this._parent = $('section.product');

    // Head
    this._head         = this._parent.find('.gj-head');
    this._headExt      = this._head.find('.gj-head__ext');
    this._headExtPrice = this._headExt.find('.product__price');
    this._headExtStyle = this._headExt.find('.product__style');

    // Gallery
    this._gallery            = this._parent.find('.product__gallery');
    this._galleryDots        = this._gallery.find('.product__gallery__dots');
    this._galleryDotsSets    = this._galleryDots.find('.dots-set');
    this._galleryDotsItems   = this._galleryDots.find('.dots-item');
    this._galleryImage       = this._gallery.find('.product__gallery__image');
    this._galleryImageMedium = this._galleryImage.children('img');
    this._galleryImageBig    = this._galleryImage.children('.image');

    // Description
    this._desc = this._parent.find('.product__description');
    this._descColorName   = this._desc.find('.product__color-name');
    this._descColorParent = this._desc.find('.gj-colors');
    this._descColorItems  = this._descColorParent.find('.gj-colors__item');
    this._descShareItems  = this._desc.find('.ya-share2');
    this._descPrice       = this._desc.find('.product__price');
    this._descStyle       = this._desc.find('.product__style');
    this._sizeLink        = this._desc.find('#pr-size-link');
    this._sizeHtml        = this._desc.find('#pr-size');

    // defaults
    this.noPhoto = 'http://storage.gloria-jeans.ru/files/new_tmp.jpg';

    this.initGallery();
    this.initSku();
    this.setEvents();
}
Product.prototype.initGallery = function () {
    var self = this;

    self._galleryImageBig.zoom();
    self._galleryDotsItems.on('click', function(event) {
        event.preventDefault();
        self.setGallery($(this));
    });
};
Product.prototype.setGallery = function (dot) {
    var self = this;
    var imgMedium = dot.data('medium') || '';
    var imgBig = dot.data('big') || '';

    // change active item
    self._galleryDotsItems.removeClass('active');
    dot.addClass('active');

    self._galleryImageMedium.attr('src', imgMedium);
    self._galleryImageBig.attr('style', 'background-image: url(' + imgBig + ');');
    self._galleryImageBig.children('img').data('src', imgBig);
    self._galleryImageBig.trigger('zoom.destroy');

    if (imgMedium && imgBig) {
        self._galleryImageBig.zoom();
    }
};
Product.prototype.setPrice = function(data) {
    var self = this;
    var priceMd = parseInt(data.markdown_price);
    var priceFr = parseInt(data.first_price);
    var html = '<span class="price">' + __("Not specified") + '</span>';

    if (priceMd > 0) {
        html =
            '<span class="price md-price">' + priceMd + ' ' + GJ.currency + '</span> ' +
            '<span class="price reg-price">' + priceFr + ' ' + GJ.currency + '</span>';
    } else if(priceFr > 0) {
        html = '<span class="price">' + priceFr + ' ' + GJ.currency + '</span>';
    }

    // set price
    self._headExtPrice.html(html);
    self._descPrice.html(html);
};
Product.prototype.initSku = function() {
    var self = this;

    self._descColorItems.on('click', function(event) {
        event.preventDefault();
        var data  = $(this).children('.color').data('price').data;
        var index = $(this).data('index');

        // change active color
        self._descColorItems.removeClass('active');
        $(this).addClass('active');

        self.setSku(index, data);
    });
};
Product.prototype.setSku = function(index, data) {
    var self = this;
    var sku = {};

    sku._activeSet   = self._galleryDotsSets.filter('[data-index="' + index + '"]');
    sku._activeDot   = sku._activeSet.find('.dots-item').eq(0);
    sku._activeShare = self._descShareItems.filter('[data-index="' + index + '"]');

    // change active share
    self._descShareItems.removeClass('active');
    sku._activeShare.addClass('active');
    // change active gallery
    self._galleryDotsSets.removeClass('active');
    sku._activeSet.addClass('active');

    self.setGallery(sku._activeDot);
    self.setPrice(data);

    self._descColorName.text(data.name);
};
Product.prototype.setEvents = function() {
    var self = this;
    self._sizeLink.on('click', function() {
        require.ensure([], function(require) {
            var modal = require('./assets/modal');
            var sizeModal = modal.createModal('pr-size-modal', __('Size chart'));
            sizeModal._content.html(self._sizeHtml.html());
            sizeModal._content.find('table').removeClass('size').addClass('table table-hover');
        })
    });
};

$(function() {
    var _slider = $('.owl-carousel');
    _slider.owlCarousel({
        items: 5,
        nav: true,
        navText: ["<span class='fa fa-2x fa-caret-left'></span>", "<span class='fa fa-2x fa-caret-right'></span>"],
    });

    main.init();
    GJ.product = new Product();
});

exports.GJ = Object.create(GJ);