module.exports = exports = (function() {

  var $ = require('jquery');
  var squares = $('.square');

  var srcEl = null;

  // mocked rule engine
  var isValidMove = function(srcEl, destEl) {
    return false;
  };

  var completeMove = function(srcEl,destEl){

    var newClass = $.grep($(srcEl).attr('class').split(' '), function(v){
      return /piece-/.test(v);
    })[0];

    if (!newClass.length) {
      console.log('something went wrong at the drop-swap event');
    }

    $(srcEl).removeClass(newClass);
    $(destEl).addClass(newClass);
  };

  var abortMove = function(srcEl, destEl) {
    
    $(destEl).removeClass('over');
    $(srcEl).removeClass('being-dragged');

  };

  var removeDragClasses = function(srcEl,destEl) {
    $(destEl).removeClass('over');    
    $(srcEl).removeClass('being-dragged');    
  };

  var dragStart = function(ev) {
    srcEl = this;
    $(ev.target).addClass('being-dragged');  
    console.log('dragstart');
  };

  var dragEnter = function(ev) {
    $(this).addClass('over');  
    console.log('dragenter');
  };

  var dragOver = function(ev) {
    ev.preventDefault();
    console.log('dragover');
  };

  var dragLeave = function(ev) {
    $(ev.target).removeClass('over');  
    console.log('dragleave');
  };

  var drop = function(ev) {
    ev.stopPropagation();
    if (isValidMove(srcEl, this)) {
      removeDragClasses(srcEl,this);
      completeMove(srcEl,this);
      console.log('drop');
    } else {
      abortMove(srcEl, this);
    }
  };

  squares.each(function(s) {
    this.addEventListener('dragstart', dragStart);
    this.addEventListener('dragenter', dragEnter);
    this.addEventListener('dragover', dragOver);
    this.addEventListener('dragleave', dragLeave);
    this.addEventListener('drop', drop);
  });

}());
