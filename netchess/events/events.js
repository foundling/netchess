var $                   = require('jquery');
var isValidMove         = require('./event_utils').isValidMove;
var getPieceName        = require('./event_utils').getPieceName;
var isPiece             = require('./event_utils').isPiece;
var isPieceAlt          = require('./event_utils').isPieceAlt;
var handleCollision     = require('./event_utils').handleCollision;
var movePiece           = require('./event_utils').movePiece;
var completeMove        = require('./event_utils').completeMove;
var cancelMove          = require('./event_utils').cancelMove;
var removeDragClasses   = require('./event_utils').removeDragClasses;
var squares             = $('.square');
var srcEl               = null;
var move                = {src: null, dst: null};

var dragStart = function(ev) {

  if (!isPiece(this)) {

    ev.preventDefault();
    return false;

  } else {

    srcEl = this;
    $(ev.target).addClass('being-dragged');

  }
};

var dragEnter = function(ev) {
    $(this).addClass('over');
};

var dragOver = function(ev) {
    ev.preventDefault();
};

var dragLeave = function(ev) {
    $(ev.target).removeClass('over');
};



var drop = function(ev) {

    var moveData;
    ev.stopPropagation();

    if ( !isValidMove(srcEl, this) ) {

        cancelMove(srcEl, this);

    } else {

        completeMove(srcEl, this);

        moveData = {
          userData: JSON.parse(window.localStorage.getItem('netchess-data')),
          move: {
            src:  srcEl.id.split('sq')[1],
            dst:  this.id.split('sq')[1]
          },
          longpolling: true
        };

        $.ajax({

            url:    '/update',
            method: 'POST',
            data:   JSON.stringify(moveData)

        }).done(function(res) {

            var moveData = JSON.parse(res);
            movePiece(moveData.src,moveData.dst);

        });
    }
};

var bindEvents = function() {
  squares.each(function(index, square, array) {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragenter', dragEnter);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('dragleave', dragLeave);
    square.addEventListener('drop', drop);
  });
};


/*
   When a player moves, they trigger this so the game engine can receive it and figure out which player it is.
   The game engine then returns true or false, which determines whether the drag and drop happens or not. 
 */

var playerMove = new CustomEvent('move');

var longPoll = function() {
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
          movePiece(moveData.src,moveData.dst);
      });
};

var initPlayerTwoLongPoll = function () {
    var ncData = JSON.parse(window.localStorage.getItem('netchess-data'));
    if (ncData.player  && ncData.player=== 'player2') {
        longPoll();
    }
};

var init = function() { 
    initPlayerTwoLongPoll();
    bindEvents();
};

module.exports = exports = {
    init: init
};
