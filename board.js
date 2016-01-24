var util = require('util');

var Board = function(height, width) {
  this._board = new Array(height * width);
  this.height = height;
  this.width = width;
  this.pieceLocations = {
        'pawn' : [
            [1,2],
            [2,2],
            [3,2],
            [4,2],
            [5,2],
            [6,2],
            [7,2],
            [8,2],
          ],
          'king': [
            [4,1],
          ],
          'queen': [
            [5,1],
          ],
          'knight': [
            [2,1],
            [7,1],
          ],
          'bishop': [
            [3,1],
            [6,1],
          ],
          'rook': [
            [1,1],
            [8,1],
          ]
  }; 

};

Board.prototype.setPiece = function(piece) {
  // get piece location data
  // write a new piece to the board at that location 
  var x = piece.position[0],
      y = piece.position[1];
  this._board[x][y] = piece;
};

Board.prototype.getPiece = function(loc) {
  var index = this.locToIndex(loc);
  return this._board[index];
};

Board.prototype.initBoard = function() {
  // for each type of piece
  // get the array of coordinates
  // loop through and create a new piece with those coordinates
  // call set piece on that to install it at the proper location
  var i = 0,
      piece;

  for (var pieceName in this.pieceLocations) {
    var locationList = piecelocations[piecename];
    for (i = 0; i < locationList.length; i++) {
      piece = new Piece(pieceName, locationList[i]);
      this.setPiece(piece);
    }
  }
 
};

Board.prototype.posToIndex = function(pos) {
  var x = pos[0],
      y = pos[1],
      w = this.width;

  return (((y - 1) * (w + x)) - 1);
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
      line='\n|---------------------------------\n',
      i,
      pieceName;

  for (i = 0; i < this._board.length; i++) {
    if (i%this.width === 0) {
      toString += line;
    }
    toString += util.format('| %s ','x');
  } 
  return toString;
};

module.exports = exports = Board; 
