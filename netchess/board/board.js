'use strict';

var Board = function(height, width) {

  this._board = new Array(height);
  for (var i = 0; i < height; i++) {
    this._board[i] = new Array(width);
  }
  this.height = height;
  this.width = width;
};

Board.prototype.setPiece = function(piece) {

  var x = piece.position[0],
      y = piece.position[1];

  this._board[x][y] = piece;

};

Board.prototype.getPiece = function(position) {
  var x = position[0],
      y = position[1];

  return this._board[x][y];    
};

module.exports = exports = Board;
