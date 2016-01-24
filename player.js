'use strict';

var Player = function(side, board) {

  this.side = side;
  this._board = board;
  this.pieces = {
    pawn:   8,   
    king:   1,
    queen:  1,
    bishop: 2,
    knight: 2,
    rook:   2,
  };

  for (var piece in this.pieces) {
    for (var i = this.pieces[piece]; i > 0; i--) {

    }
  }

};

module.exports = exports = Player;
