var Board = function(height, width) {
  this._board = new Array(height*width);
  this.height = height;
  this.width = width;
  this.posToIndex = function(x,y) {
    return width*(x - 1) + height * (y - 1); 
  }
};

Board.prototype.get = function(position) {
  var x = position[0];
  var y = position[1];
  var targetIndex = this.posToIndex(x,y);
  return this._board[targetIndex]; 
};

Board.prototype.set = function() {

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

function RuleEngine(board) {
  
}

var log = console.log;

var board = new Board(8,8);
board._board[0] = 'test';
log(board.get([1,1]));
