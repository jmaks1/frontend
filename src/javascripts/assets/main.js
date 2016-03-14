"use strict";

/**
 * Require defaults
 */

var material = require('bootstrap-material-design');
var menu = require('./menu');
var GJ = require('./gj');
var User = require('./user');

require('jquery-form');
require('jGrowl');
require('bootstrap-sass');

//import 'jquery-form';
//import 'jGrowl';
//import 'bootstrap-sass';

module.exports = {
    youtubeModal: function (trigger) {
        trigger.on('click', function (e) {
            e.preventDefault();
            var videoSRC = $(this).attr("href"),
                videoHtml,
                videoType,
                videoId = videoSRC.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

            if (videoId[3].indexOf('youtu') > -1) {
                videoType = 'youtube';
            } else if (videoId[3].indexOf('vimeo') > -1) {
                videoType = 'vimeo';
                videoId = '4EPOHcnJfoQ';
            } else {
                throw new Error('Video URL not supported.');
            }

            if (videoType === 'youtube') {
                videoHtml = '<iframe width="100%" height="490" src="https://www.youtube.com/embed/'+videoId[6]+'?autoplay=1"></iframe>';
            }

            require.ensure([], function(require) {
                var modal = require('./modal');
                var qvModal = modal.createModal('quick-view-video');
                qvModal._content.html(videoHtml);
            });
        });
    },
    init: function () {

        $.material.init();
        menu.init();


        /**
         * Subscribe
         */
        var subscribe = {};
        subscribe._form = $('.gj-subscribe');
        subscribe._form.ajaxForm({
            url: '/ajax/subscribe',
            type: 'POST',
            dataType: 'json',
            beforeSubmit: function (arr, parent) {return User.beforeHandler(arr, parent);},
            success: function(response, status, xhr, parent) {User.afterHandler(response, parent);}
        });

        /**
         * Feedback
         */
        $('#feedback-btn').on('click', function(event) {
            event.preventDefault();
            require.ensure([], function(require) {
                var modal = require('./modal');

                String.prototype.capitalizeFirstLetter = function() {
                    return this.charAt(0).toUpperCase() + this.slice(1);
                };

                $.get((GJ.lang == 'en' ? '/en' : '') + '/ajax/feedback_new', {}, function (data) {
                    var fbModal = modal.createModal('feedback');
                    fbModal._content.html(data);
                    fbModal._form = fbModal._content.find('#feedback-form');
                    fbModal._form.ajaxForm({
                        url: '/ajax/feedback',
                        type: 'POST',
                        dataType: 'json',
                        beforeSubmit: function () {
                            fbModal._form.find('#feedback-submit').val(__('Sending') + '...');
                        },
                        success: function (resp) {
                            fbModal._form.find(".form-group").removeClass('has-error');

                            if (resp.errors) {
                                for (var id in resp.errors) {
                                    fbModal._form.find('#input' + id.capitalizeFirstLetter()).parents(".form-group").addClass('has-error');
                                    fbModal._form.find('#feedback-submit').val(__('Send'));

                                    $.jGrowl(resp.errors[id], {group: 'alert-danger'});
                                }
                                return;
                            } else {
                                fbModal._parent.modal('hide');
                                $.jGrowl(resp.status, {group: 'alert-success'});
                            }
                        },
                        error: function () {
                            fbModal._form.find('#feedback-submit').val(__('Send'));
                        }
                    });

                });
            }, 'modal')
        });

        /**
         * Geo Locator
         */
        var geoLocator = {};
        geoLocator.parent = $('.gj-geo');
        geoLocator.modal = geoLocator.parent.find('.gj-geo__modal');

        if (geoLocator.modal.length > 0) {
            geoLocator.modal.find('.gj-geo__close').on('click', function() {
                geoLocator.modal.remove();
            });
            geoLocator.modal.find('.btn-accept').on('click', function() {
                geoLocator.modal.remove();
                $.getJSON('/ajax/DisableQuestion', function (data) {
                    console.log(data);
                });
            });
            geoLocator.modal.find('.btn-choose').on('click', function() {
                geoLocator.modal.remove();
            });
        }

        geoLocator.parent.find('.btn-choose').on('click', function(event) {
            event.preventDefault();
            require.ensure(['./modal'], function(require) {
                var modal = require('./modal');

                $.getJSON((GJ.lang == 'en' ? '/en' : '') + '/ajax/Geo_Dialog_new', function (data) {
                    if (!data.error) {
                        var geoModal = modal.createModal('geo');

                        geoModal._content.html(data.body);

                        // get selects
                        geoModal._selCountry     = geoModal._content.find('#geo-country');
                        geoModal._selRegion      = geoModal._content.find('#geo-region');
                        geoModal._selCity        = geoModal._content.find('#geo-city');
                        geoModal._accept         = geoModal._content.find('#geo-accept');
                        geoModal._selStack       = geoModal._content.find('#tpl-geo');
                        geoModal._optStackRegion = geoModal._selStack.find('.region');
                        geoModal._optStackCity   = geoModal._selStack.find('.city');


                        geoModal._selCountry.change(function () {
                            var cid = $(this).val();
                            //geoModal._opt.removeAttr('selected');
                            geoModal._selRegion.find('.region').remove();
                            geoModal._selCity.find('.city').remove();
                            geoModal._optStackRegion.each(function () {
                                if ($(this).attr('countryid') == cid) {
                                    geoModal._selRegion.append($(this).clone());
                                }
                            });
                        });

                        geoModal._selRegion.change(function () {
                            var rid = $(this).val();
                            //geoModal._opt.removeAttr('selected');
                            geoModal._selCity.find('.city').remove();
                            geoModal._optStackCity.each(function () {
                                if ($(this).attr('regionid') == rid) {
                                    geoModal._selCity.append($(this).clone());
                                }
                            });
                        });

                        geoModal._accept.click(function () {
                            var cityid = geoModal._selCity.val();
                            $.getJSON('/ajax/Change_geo_location', {cityid: cityid}, function () {
                                document.location.reload();
                            });
                        });
                    }
                });
            }, 'modal');
        });
    }
};