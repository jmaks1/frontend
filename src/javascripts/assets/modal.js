"use strict";

require('bootstrap-sass');
//import 'bootstrap-sass';

module.exports = {
    createModal: function (id, title, size) {
        var modal = {};

        modal.title = title || false;
        modal.size = size || '';
        modal.id = id || 'gj-modal';
        modal._parent = $('#' + modal.id);
        modal.html =
            '<div class="modal fade" id="' + modal.id + '" tabindex="-1" role="dialog" aria-labelledby="' + modal.id + 'Label"> ' +
                '<div class="modal-dialog ' + modal.size + '" role="document">' +
                    '<div class="modal-content"></div>' +
                '</div> ' +
            '</div>';

        if (modal.title) {
            modal.html =
                '<div class="modal fade" id="' + modal.id + '" tabindex="-1" role="dialog" aria-labelledby="' + modal.id + 'Label"> ' +
                    '<div class="modal-dialog ' + modal.size + '" role="document">' +
                        '<div class="modal-content">' +
                            '<div class="modal-header">' +
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                '<h4 class="modal-title" id="' + modal.id + 'Label">' + modal.title + '</h4>' +
                            '</div>' +
                            '<div class="modal-body">' +
                            '</div>' +
                        '</div>' +
                    '</div> ' +
                '</div>';
        }

        // init modal
        if (modal._parent.length > 0) {
            modal._parent.modal('show');
        } else {
            $('body').append(modal.html);
            modal._parent = $('#' + modal.id);
            modal._parent.modal('show');
        }

        if (modal.title) {
            modal._content = modal._parent.find('.modal-body');
        } else {
            modal._content = modal._parent.find('.modal-content');
        }

        modal._parent.on('hidden.bs.modal', function (e) {
            modal._parent.remove();
        });

        return modal;
    }
};