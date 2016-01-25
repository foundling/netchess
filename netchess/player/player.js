'use strict';

var Player = function(name, side, board) {

  this.name = name;
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
};

module.exports = exports = Player;
