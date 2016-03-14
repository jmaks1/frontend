"use strict";

/**
 * Career main file
 * Require scripts
 */

var main = require('./assets/main');
var GJ = require('./assets/gj');
var form = {};
var vacancy = {};

$(function() {
    main.init();

    vacancy.self = $('.vacancy');
    form.self = $('#form-office');

    if (vacancy.self.length > 0) {
        vacancy.list = vacancy.self.find('.list-group');
        vacancy.cities = vacancy.list.find('.vacancy__item__city');
        vacancy.regions = vacancy.self.find('#regions');
        // show vacancies
        vacancy.cities.click(function () {
            $(this).parent('.vacancy__item').children('.vacancy__item__detail').slideToggle();
        });
        // change city list
        vacancy.list.filter(':visible').hide();
        vacancy.list.filter('[data-region="' + vacancy.regions.val() + '"]').show();
        vacancy.regions.change(function () {
            vacancy.list.filter(':visible').hide();
            vacancy.list.filter('[data-region="' + $(this).val() + '"]').fadeIn();
        });
    }

    if (form.self.length > 0) {
        require.ensure([], function(require) {
            require('jquery-form');
            require('jquery-ui');
            require('jquery-mask-plugin');
            require('jGrowl');

            GJ.loadCss('/bower_components/jquery-ui/themes/base/core.css');
            GJ.loadCss('/bower_components/jquery-ui/themes/base/datepicker.css');
            GJ.loadCss('/bower_components/jquery-ui/themes/base/theme.css');
            GJ.loadCss('/bower_components/jGrowl/jquery.jgrowl.min.css');

            form.education = {self: form.self.find('#education-list'), count: 0};
            form.experience = {self: form.self.find('#experience-list'), count: 0};
            form.language = {self: form.self.find('#language-list'), count: 0};
            form.months = $('#months-list').html();
            form.years = $('#years-list').html();
            form.id = $('#form-id').val();
            // set datepicker & mask
            form.self.find('.form-control[name="form[phone]"]').mask('0(000)-000-00-00');
            form.self.find('.form-control[name="form[birthday]"]').datepicker(GJ.datepickerOpts);

            form.education.self.on('click', '.form-list__item .close', function(e) {
                e.preventDefault();
                $(this).parent().remove();
                form.education.count--;
            });
            form.experience.self.on('click', '.form-list__item .close', function(e) {
                e.preventDefault();
                $(this).parent().remove();
                form.experience.count--;
            });
            form.language.self.on('click', '.form-list__item .close', function(e) {
                e.preventDefault();
                $(this).parent().remove();
                form.language.count--;
            });

            form.education.self.children('.btn').on('click', function(e) {
                e.preventDefault();
                form.education.count++;

                var html =
                    '<div class="form-list__item"> ' +
                    '<div class="row"> ' +
                    '<div class="col-xs-6 col-sm-2"> ' +
                    '<div class="form-group"> ' +
                    '<div class="table-middle"> ' +
                    '<div class="table-middle__cell">Поступление (год)</div> ' +
                    '</div> ' +
                    '<input type="text" name="form[education][' + form.education.count + '][start-year]" class="form-control"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-xs-6 col-sm-2"> ' +
                    '<div class="form-group"> ' +
                    '<div class="table-middle"> ' +
                    '<div class="table-middle__cell">Окончание (год)</div> ' +
                    '</div> ' +
                    '<input type="text" name="form[education][' + form.education.count + '][end-year]" class="form-control"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-xs-12 col-sm-2"> ' +
                    '<div class="form-group"> ' +
                    '<div class="table-middle"> ' +
                    '<div class="table-middle__cell">Форма обучения</div> ' +
                    '</div> ' +
                    '<input type="text" name="form[education][' + form.education.count + '][form-training]" class="form-control"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-xs-12 col-sm-3"> ' +
                    '<div class="form-group"> ' +
                    '<div class="table-middle"> ' +
                    '<div class="table-middle__cell">Полное название учебного заведения, факультет</div> ' +
                    '</div> ' +
                    '<input type="text" name="form[education][' + form.education.count + '][institution]" class="form-control"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-xs-12 col-sm-3"> ' +
                    '<div class="form-group"> ' +
                    '<div class="table-middle"> ' +
                    '<div class="table-middle__cell">Специальность, квалификация</div> ' +
                    '</div> ' +
                    '<input type="text" name="form[education][' + form.education.count + '][specialization]" class="form-control"> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<a href="#" class="close">×</a> ' +
                    '</div>';
                $(this).before(html);
            });
            form.experience.self.children('.btn').on('click', function(e) {
                e.preventDefault();
                form.experience.count++;

                var html =
                    '<div class="form-list__item"> ' +
                    '<div>Период:</div> ' +
                    '<div class="row"> ' +
                    '<div class="col-sm-6"> ' +
                    '<span>С:</span> ' +
                    '<div class="row"> ' +
                    '<div class="col-sm-6"> ' +
                    '<div class="form-group"> ' +
                    '<select class="form-control" name="form[experience][' + form.experience.count + '][start-month]">' + form.months + '</select> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-sm-6"> ' +
                    '<div class="form-group"> ' +
                    '<select class="form-control" name="form[experience][' + form.experience.count + '][start-year]">' + form.years + '</select> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-sm-6"> ' +
                    '<span>По:</span> ' +
                    '<div class="row"> ' +
                    '<div class="col-sm-6"> ' +
                    '<div class="form-group"> ' +
                    '<select class="form-control" name="form[experience][' + form.experience.count + '][end-month]">' + form.months + '</select> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-sm-6"> ' +
                    '<div class="form-group"> ' +
                    '<select class="form-control" name="form[experience][' + form.experience.count + '][end-year]">' + form.years + '</select> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="row"> ' +
                    '<div class="col-sm-6"> ' +
                    '<div class="form-group"> ' +
                    '<span>Организация:</span> ' +
                    '<input class="form-control" type="text" name="form[experience][' + form.experience.count + '][company]"/> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-sm-6"> ' +
                    '<div class="form-group"> ' +
                    '<span>Должность:</span> ' +
                    '<input class="form-control" type="text" name="form[experience][' + form.experience.count + '][position]"/> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<span>Основные обязанности:</span> ' +
                    '<textarea class="form-control" name="form[experience][' + form.experience.count + '][duties]" rows="3"></textarea> ' +
                    '</div> ' +
                    '<a href="#" class="close">×</a> ' +
                    '</div>';

                $(this).before(html);
            });
            form.language.self.children('.btn').on('click', function(e) {
                e.preventDefault();
                form.language.count++;

                var html =
                    '<div class="form-list__item"> ' +
                    '<br> ' +
                    '<div class="row"> ' +
                    '<div class="col-xs-8 col-sm-9"> ' +
                    '<div class="form-group"> ' +
                    '<input type="text" name="form[language][' + form.language.count + '][name]" class="form-control"> ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="col-xs-4 col-sm-3"> ' +
                    '<select class="form-control" name="form[language][' + form.language.count + '][level]"> ' +
                    '<option>1</option> ' +
                    '<option>2</option> ' +
                    '<option>3</option> ' +
                    '<option>4</option>' +
                    '<option>5</option> ' +
                    '</select> ' +
                    '</div> ' +
                    '</div> ' +
                    '<a href="#" class="close">×</a> ' +
                    '</div>';

                $(this).before(html);
            });

            form.self.ajaxForm({
                url: '/ajax/form_office',
                data: {hh_id: form.id, form_type: 'form-office'},
                type: 'post',
                dataType: 'json',
                success: function (resp) {
                    $('.form-elem').removeClass('error-field');
                    if (resp.errors.length > 0) {
                        for (var i = 0; i < resp.errors.length; ++i) {
                            $('.form-control[name="form['+resp.errors[i]+']"]').parent().addClass('has-error');
                        }
                        $.jGrowl(resp.msg, {
                            group: 'alert-danger',
                            themeState: ''
                        });

                        console.log(resp);
                    } else {
                        $('.form-control').val('');
                        $.jGrowl(resp.msg, {
                            group: 'alert-success',
                            themeState: ''
                        });

                        console.log(resp);
                    }
                }
            });
        }, 'form-office');
    }
});


exports.GJ = Object.create(GJ);