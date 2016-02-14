module.exports = exports = (function() {

  var $ = require('jquery');
  var squares = $('.square');

  var srcEl = null;

  /*********************/
  /* UTILITY FUNCTIONS */
  /*********************/

  var isValidMove = function(srcEl, destEl) {
    // simple mock func
    //this is where the rule engine comes in
    return true;
  };

  var getPieceName = function(srcEl) {
    return $.grep($(srcEl).attr('class').split(' '), function(v){
      return /piece-/.test(v);
    })[0];
  };

  var isPiece = function(srcEl) {
    var pieceName = $.grep($(srcEl).attr('class').split(' '), function(v){
      return /piece-/.test(v);
    })[0];
    return (pieceName) ? true : false;
  };

  var completeMove = function(srcEl,destEl){
    
    var newClass = getPieceName(srcEl);

    if (!newClass) {
      console.log('something went wrong at the drop-swap event');
    }

    $(srcEl).removeClass(newClass);
    $(destEl).addClass(newClass);

    removeDragClasses(srcEl,this);
  };

  var abortMove = function(srcEl, destEl) {
    
    $(destEl).removeClass('over');
    $(srcEl).removeClass('being-dragged');

  };

  var removeDragClasses = function(srcEl,destEl) {
    $(destEl).removeClass('over');    
    $(srcEl).removeClass('being-dragged');    
  };

  /******************/
  /* Event Handlers */
  /******************/

  var dragStart = function(ev) {
    if (!isPiece(this)) {
      ev.preventDefault();
      return false;
    } else {
      srcEl = this;
      $(ev.target).addClass('being-dragged');  
      console.log('dragstart');
    }
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
    
    if ( !isValidMove(srcEl, this) ) {
        abortMove(srcEl, this);
    }
    else {
        completeMove(srcEl, this);

        var data = {
          src: srcEl.id.split('sq')[1],
          dest: this.id.split('sq')[1],
        };

        $.ajax({
            url: '/update',
            method: 'POST',
            data: JSON.stringify(data),
        }).done(function(data) {
            console.log(data);
        });
        console.log('drop');
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
