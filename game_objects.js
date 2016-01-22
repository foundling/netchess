// utility funcs
var log = console.log;

// pieces 
var Piece = function(name, position){
  var validNames = [
        'pawn',
        'king',
        'queen',
        'bishop',
        'knight',
        'rook'
  ];
  if (validNames.some(function(aValidName){ 
        return name === aValidName; 
      }).length) {
  console.log(validNames.some(function(aValidName){ 
        return name === aValidName; 
      }).length);
    this.name = name;
    this.position = position;
    this.alive = true;
    this.next = function() {
    };

  } else {
    console.log('INCORRECT INVOCATION OF PIECE CONSTRUCTOR');
    throw 'FUNC_INVError';     
  }
}; 

// ruleEngine: lays down the possible moves for each piece
var RuleEngine = function() {
  this.validators = {
    knight: {
      lShape: function(startPos, endPos) {
        var deltaX = Math.abs(endPos[0] - startPos[0]);
        var deltaY = Math.abs(endPos[1] - startPos[1]);
        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
        return hypotenuse === Math.sqrt(5);
      }
    },
    queen: {
      straightLine: function(startPos, endPos) {
        var startX = startPos[0];
        var startY = startPos[1];
        var endX = endPos[0];
        var endY = endPos[1];
        // do either the x coords or y coords remain the same? 
        return  (startX === endX) || (startY === endY);  
      },
      diagonal: function(startPos, endPos) {
        var deltaX = Math.abs(endPos[0] - startPos[0]);
        var deltaY = Math.abs(endPos[1] - startPos[1]);
        // is the absolute change in x the same as the absolute change in y?
        return deltaX === deltaY;
      },
    },
    king: {
      oneSpace: function(startPos, endPos) {
        var deltaX = Math.abs(startPos[0] - endPos[0]);
        var deltaY = Math.abs(startPos[1] - endPos[1]);
        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));       
        console.log(deltaX,deltaY,hypotenuse);
        return (hypotenuse === 1) || (hypotenuse === Math.sqrt(2));
      },
    }

  };
};

// gameEngine
var GameEngine = function() {

};

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


Board.prototype.SetPiece = function(piece) {
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

var Piece = function(name, position, alive, ruleEngine) {

  this.name = name;
  this.position = position;
  this.alive = alive;  
  this.ruleEngine = ruleEngine;

};

Piece.prototype.next = function() {
  return this.ruleEngine.getPossibleMoves(this.name, this.position);
};

var ruleEngine = new RuleEngine();

module.exports = exports = {
  Board: Board, 
  Piece: Piece,
  GameEngine: GameEngine,
  RuleEngine: RuleEngine
};

var x = new Piece('xyz',[0,0]);
