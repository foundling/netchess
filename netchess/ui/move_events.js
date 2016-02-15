module.exports = exports = (function() {

  var $ = require('jquery'),
      squares = $('.square'),
      srcEl = null;

  var move = {
     src: null,
     dest: null,
  };
  /*********************/
  /* UTILITY FUNCTIONS */
  /*********************/

  var isValidMove = function(srcEl, destEl) {  
      return true; 
  };

  var getPieceName = function(el) {
    return $.grep($(el).attr('class').split(' '), function(v){
      return /piece-/.test(v);
    })[0];
  };

  var isPiece = function(el) {
    return getPieceName(el).length ? true : false;
  };

  var isPieceAlt = function(el) {
      return !!getPieceName(el).length; 
  };

  var handleCollision = function(srcEl, destEl) {

  };

  var movePiece = function(srcEl, destEl) {
      // k= swp4p =
      var tempAttributes = {};
      if (isPiece(destEl)) {
          handleCollision(srcEl, destEl);
          var pieceName = getPieceName(el);
      }
  }; 

  var swapPieceForBlank = function() {

  }; 

  var completeMove = function(srcEl, destEl){
    
    var newClass = getPieceName(srcEl);

    if (!newClass) {
      console.log('something went wrong at the drop-swap event');
    }

    $(srcEl).removeClass(newClass);
    $(destEl).addClass(newClass);

    removeDragClasses(srcEl,this);
  };

  var cancelMove = function(srcEl, destEl) {
    
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
        cancelMove(srcEl, this);
    }
    else {
        completeMove(srcEl, this);

        var netchessData = JSON.parse(window.localStorage.getItem('netchess-data'));
        console.log(netchessData);
        var data = {
          // fix this: parse 'netchess-data' object in local storage instead
          userData: netchessData,
          move: {
            src:  srcEl.id.split('sq')[1],
            dest: this.id.split('sq')[1]
          }
        };

        $.ajax({
            url: '/update',
            method: 'POST',
            data: JSON.stringify(data),
        }).done(function(data) {
            console.log(JSON.parse(Object.keys(data)[0]));  
            // this is a workaround for express.js json middleware issue on server ?
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