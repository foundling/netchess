'use strict';

var util = require('util');
var Piece = require('./piece');
var pieceLocations = require('./pieceLocations');

var Board = function(height, width) {
  this._board = new Array(height * width);
  this.height = height;
  this.width = width;
};

Board.prototype.setPiece = function(piece) {
  // get piece location data
  // write a new piece to the board at that location 
  
  var index = this.posToIndex(piece.position);
  this._board[index] = piece;
};


Board.prototype.getPiece = function(loc) {
  var index = this.posToIndex(loc);
  return this._board[index];
};


Board.prototype.initBoard = function() {
  var i = 0,
      piece,
      playerBoardSide,
      pieceName,
      locations;

  for (playerBoardSide in pieceLocations) {
    for (pieceName in pieceLocations[playerBoardSide]) {
      locations = pieceLocations[playerBoardSide][pieceName];
      for (i = 0; i < locations.length; i++) {
        piece = new Piece(pieceName, locations[i]);
        this.setPiece(piece);
      }
    }
  }
 
};

Board.prototype.posToIndex = function(pos) {
  var x = pos[0],
      y = pos[1],
      w = this.width;

  return (((y - 1) * w) + x) - 1;
};

Board.prototype.indexToPos = function(index) {
  // check this again
  // they don't work
  var x,
      y;

  y = Math.floor(index/this.width) + 1;
  x = (index % this.width) + 1;
  return [x,y];
};

Board.prototype.toString = function() {
  var toString = '',
      line='\n|-------------------------------|\n',
      lineEnd = '|',
      i,
      pieceName;

  for (i = 0; i < this._board.length; i++) {
    if ( i !== 0 && i%this.width === 0) {
      toString += lineEnd;
    }
    if (i%this.width === 0) {
      toString += line;
    }
    var piece = this._board[i];
    toString += util.format('| %s ', (piece) ? piece.name[0] : ' ');
  } 
  toString += lineEnd;
  toString += line;
  return toString;
};

module.exports = exports = Board; 
