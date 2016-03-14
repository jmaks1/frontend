"use strict";

/**
 * Status obj
 */

var GJ = {};

GJ.getCookie = function(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

GJ.loadCss = function (url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
};

GJ.time = new Date().getTime();
GJ.lang = LANG;
GJ.mode = NODE_ENV;
GJ.region = GJ.getCookie("sales_region");
GJ.datepickerOpts = {
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    yearRange: "-100:+0",
    changeYear: true,
    changeMonth: true,
    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
};

switch(GJ.region) {
    // ua
    case '32':
        GJ.currency = '<span class="gj gj-hryvnia"></span>';
        break;
    // ge
    case '114':
        GJ.currency = '<span class="gj gj-lari"></span>';
        break;
    // ru
    default:
        GJ.currency = '<span class="gj gj-ruble"></span>';
}

module.exports = GJ;