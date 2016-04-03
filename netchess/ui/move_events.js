module.exports = exports = (function() {

  var $ = require('jquery'),
      squares = $('.square'),
      srcEl = null,
      move = {
        src: null,
        dst: null,
      };

  /*********************/
  /* UTILITY FUNCTIONS */
  /*********************/

  var isValidMove = function(srcEl, dstEl) {
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

  var handleCollision = function(srcEl, dstEl) {

  };

  var movePiece = function(srcSquare, dstSquare) {
      var srcEl = $('#sq' + srcSquare);
      var dstEl = $('#sq' + dstSquare);
      completeMove(srcEl,dstEl);
  };

  var swapPieceForBlank = function() {

  };

  var completeMove = function(srcEl, dstEl){

    var newClass = getPieceName(srcEl);

    if (!newClass) {
      console.log('something went wrong at the drop-swap event');
    }

    $(srcEl).removeClass(newClass);
    $(dstEl).addClass(newClass);

    removeDragClasses(srcEl,dstEl);
  };

  var cancelMove = function(srcEl, dstEl) {

    $(dstEl).removeClass('over');
    $(srcEl).removeClass('being-dragged');

  };

  var removeDragClasses = function(srcEl,dstEl) {
    $(dstEl).removeClass('over');
    $(srcEl).removeClass('being-dragged');
  };

  /*************************/
  /* Custom Event Emitters */
  /*************************/

  var playerMove = new CustomEvent('move');
  // when a player moves, they trigger this so the game engine can receive it, figure out which player it is,
  // and then return true or false as a validation value.  that value is then used to determine if the
  // drag and drop animations take effect or not. 


  /******************/
  /* Event Handlers */
  /******************/


  var playerMoved = function(e) {
      var playerNumber = Array.prototype.filter.call(e.target.classList, function(className) {
          return (/player/.test(className));
      })[0];
  };

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

  /* initial player 2 polling */
  if (JSON.parse(window.localStorage.getItem('netchess-data')).player === 'player2') {
      $.ajax({

          url:    '/update',
          method: 'POST',
          data:   JSON.stringify({
              userData: JSON.parse(window.localStorage.getItem('netchess-data')),
              init: true,
              move: {
                src:  null,
                dst:  null
              }
          })

      }).done(function(res) {
          var moveData = JSON.parse(res);
          // wait for other player's response move
          console.log('update board with this information: ', moveData.src, moveData.dst);
          movePiece(moveData.src,moveData.dst);
      });
  }

  var drop = function(ev) {
    var moveData;

    ev.stopPropagation();

    if ( !isValidMove(srcEl, this) ) {
        cancelMove(srcEl, this);
    }
    else {

        completeMove(srcEl, this);

        moveData = {
          userData: JSON.parse(window.localStorage.getItem('netchess-data')),
          move: {
            src:  srcEl.id.split('sq')[1],
            dst:  this.id.split('sq')[1]
          },
          longpolling: true,
        };

        $.ajax({

            url:    '/update',
            method: 'POST',
            data:   JSON.stringify(moveData),

        }).done(function(res) {
            var moveData = JSON.parse(res);
            // wait for other player's response move
            console.log('update board with this information: ', moveData.src, moveData.dst);
            movePiece(moveData.src,moveData.dst);
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
