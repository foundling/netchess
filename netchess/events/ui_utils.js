'use strict';

var $ = require('jquery');

var ui_utils = module.exports = exports = {

    getPlayer: function(el) {
        return el;
    },

    getPieceName: function(el) {
        return $.grep($(el).attr('class').split(' '), function(v){
            return /piece-/.test(v);
        })[0] || '';
    },

    isPiece: function(el) {
        return ui_utils.getPieceName(el).length;
    },

    movePiece: function(srcSquare, dstSquare) {
        var srcEl = $('#sq' + srcSquare);
        var dstEl = $('#sq' + dstSquare);
        ui_utils.completeMove(srcEl,dstEl);
    },

    completeMove: function(srcEl, dstEl){

        var newClass = ui_utils.getPieceName(srcEl);

        $(srcEl).removeClass(newClass);
        $(dstEl).addClass(newClass);

        ui_utils.removeDragClasses(srcEl,dstEl);
    },

    cancelMove: function(srcEl, dstEl) {

        $(dstEl).removeClass('over');
        $(srcEl).removeClass('being-dragged');

    },

    removeDragClasses: function(srcEl,dstEl) {
        $(dstEl).removeClass('over');
        $(srcEl).removeClass('being-dragged');
    }

};
