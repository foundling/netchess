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
  this.pieceLocations[piece.name].forEach(function(loc) {
      //loc is a coordinate pair
      //
      //NOTE: you need to use the Boards getter/setter bc you wrote that to simplify the 1 offset 
    var x = loc[0],y = loc[1];
    if (this._board[x][y]) {
      console.log('There is already a piece here. Fail');
      return false;
    } else {
      this._board[x][y] = Piece; 
    }
          
  });
};

Board.prototype.toString = function() {
  var lineBreak = (i % this._board.width === 0) ? '\n' : '';

  for (var i = 0; i < this._board.length; i++) {
      console.log('| %s | %s', this._board[i],lineBreak);
  }    
};

Board.prototype.get = function(position) {
  var targetIndex = this.posToIndex(position);
  return this._board[targetIndex]; 
};

Board.prototype.set = function(obj, position) {
  var targetIndex = this.posToIndex(position);
  this._board[targetIndex] = obj; 
};


module.exports = exports = Board; 
