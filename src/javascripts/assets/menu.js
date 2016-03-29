/**
 * Init Menu
 */

//require('perfect-scrollbar/jquery');
import 'perfect-scrollbar/jquery';

module.exports = {
    init: function() {

        var  gjHead = {}
            ,gjMenu = {}
            ,gjMenuMobile = {};

        /**
         * Catalog head
         */
        gjHead._self     = $('.gj-head');
        gjHead._menu     = gjHead._self.find('.gj-head__menu');
        gjHead._menuBtn  = gjHead._menu.find('.btn-menu');
        gjHead._menuWrap = gjHead._menu.find('.wrap-menu');
        gjHead._menuBtn.on('click', function(){
            gjHead._menuBtn.children('.icon').toggleClass('active');
            gjHead._menuWrap.slideToggle();
        });


        /**
         * Top menu
         */
        gjMenu._self = $('#top-menu');
        gjMenu._self.find('.menu-bg').on('mouseenter', function(){
            $(this).slideUp(300);
            setTimeout(function(){
                gjMenu._self.find('.menu-bg').removeAttr('style');
            }, 400);
        });


        /**
         * Mobile top menu
         */
        gjMenuMobile._self     = $('#top-menu-mobile');
        gjMenuMobile._btnMenu  = gjMenuMobile._self.find('.btn-menu');
        gjMenuMobile._panel    = $('.header .header-panel');
        gjMenuMobile._btnLink  = gjMenuMobile._self.find('.link-dropdown');
        gjMenuMobile._dropDown = gjMenuMobile._self.find('.menu-dropdown');
        gjMenuMobile._self.find('.menu').children('li').children('.menu-dropdown').children('ul').perfectScrollbar();
        gjMenuMobile._btnMenu.on('click', function(e) {
            e.preventDefault();
            gjMenuMobile._btnMenu.children('.icon').toggleClass('active');
            gjMenuMobile._dropDown.removeClass('active');
            gjMenuMobile._self.find('.menu').removeClass('hidden');
            gjMenuMobile._self.find('.menu').toggleClass('active');
            gjMenuMobile._panel.toggleClass('active');
        });
        gjMenuMobile._btnLink.on('click', function (e) {
            e.preventDefault();
            var parent = $(this).parent('li');
            var root   = $(this).parents('.menu-root').eq(0);

            // rebuild scroll to fix
            root.children('ul').perfectScrollbar('destroy');
            setTimeout(function(){
                root.children('ul').perfectScrollbar();
            },1);

            if ($(this).hasClass('active')) {
                root.find('.menu-dropdown').removeClass('active');
                root.find('.link-dropdown').removeClass('active');
            } else {
                root.find('.menu-dropdown').removeClass('active');
                root.find('.link-dropdown').removeClass('active');

                parent.children('.menu-dropdown').toggleClass('active');
                $(this).toggleClass('active');
            }
        });

    }
};