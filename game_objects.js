// utility funcs
var log = console.log;

// pieces 
var Piece = function(name, position){
  if ( 
      [
        'pawn',
        'king',
        'queen',
        'bishop',
        'knight',
        'rook'
      ]
      .some(function(aValidName){ 
        return name === aValidName; 
      })
  ) {

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
  this._board = new Array(height*width);
  this.height = height;
  this.width = width;
};

Board.prototype.toString = function() {
  for (var i = 0; i < this._board.length; i++) {
    console.log(i);    
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
