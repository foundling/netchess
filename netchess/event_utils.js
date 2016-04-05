var $ = require('jquery');
var validator = require('./engine/validator');

var event_utils = module.exports = exports = {

  isValidMove: function(srcEl, dstEl) {
        var pieceType = Array.prototype.filter.call(srcEl.classList, function(className) {
            return /piece-/.test(className);
        })[0].split('-').slice(-1).pop();

        var player = Array.prototype.filter.call(srcEl.classList, function(className) {
            return /player/.test(className);
        })[0];

        return validator.validate(player, pieceType, srcEl, dstEl);
  },

  getPieceName: function(el) {
    return $.grep($(el).attr('class').split(' '), function(v){
      return /piece-/.test(v);
    })[0];
  },

  isPiece: function(el) {
    return event_utils.getPieceName(el).length ? true : false;
  },

  isPieceAlt: function(el) {
      return !!event_utils.getPieceName(el).length;
  },

  handleCollision: function(srcEl, dstEl) {

  },

  movePiece: function(srcSquare, dstSquare) {
      var srcEl = $('#sq' + srcSquare);
      var dstEl = $('#sq' + dstSquare);
      event_utils.completeMove(srcEl,dstEl);
  },

  completeMove: function(srcEl, dstEl){

    var newClass = event_utils.getPieceName(srcEl);

    if (!newClass) {
      console.log('something went wrong at the drop-swap event');
    }

    $(srcEl).removeClass(newClass);
    $(dstEl).addClass(newClass);

    event_utils.removeDragClasses(srcEl,dstEl);
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
