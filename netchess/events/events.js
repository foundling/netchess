'use strict';

var validator           = require('../engine/validator');
var gameEngine          = require('../engine/game_engine');
var isValidMove = function() {return true;};

// UI-related code
var $                   = require('jquery');
var squares             = $('.square');
var getPieceName        = require('./ui_utils').getPieceName;
var getPlayer           = require('./ui_utils').getPlayer;
var isPiece             = require('./ui_utils').isPiece;
var movePiece           = require('./ui_utils').movePiece;
var completeMove        = require('./ui_utils').completeMove;
var cancelMove          = require('./ui_utils').cancelMove;
var removeDragClasses   = require('./ui_utils').removeDragClasses;
var handleCollision     = require('./ui_utils').handleCollision;


// data going to the server 
var move = {
    src: null, 
    dst: null
};

// Drag and Drop data / events 
var srcEl = null;

var dragStart = function(ev) {
    ev.dataTransfer.setData('text/plain','');

    srcEl = ev.target;
    if (!isPiece(srcEl)) {
        ev.preventDefault();
        return false;
    }

    var player = getPlayer(srcEl);
    gameEngine.itsYourTurn(player);
    // parse player from srcEl, pass to game_engine
    $(ev.target).addClass('being-dragged');

};

var dragEnter = function(ev) {
    $(ev.target).addClass('over');
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

    if ( !isValidMove(srcEl, ev.target) ) {

        cancelMove(srcEl, ev.target);

    } else {

        completeMove(srcEl, ev.target);

        moveData = {
          userData: JSON.parse(window.localStorage.getItem('netchess-data')),
          move: {
            src:  srcEl.id.split('sq')[1],
            dst:  ev.target.id.split('sq')[1]
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
    square.addEventListener('dragover',  dragOver);
    square.addEventListener('dragleave', dragLeave);
    square.addEventListener('drop',      drop);
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
