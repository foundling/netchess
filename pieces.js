// utility funcs
var log = console.log;

// pieces 
var Piece = function(name, position){
  this.name = name;
  this.position = position;
  this.alive = true;
  this.next = function() {
    // use rule engine to get next possible moves
  };
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

Board.prototype.posToIndex = function(position) {
  var x = position[0];
  var y = position[1];
  return this.width  * (x - 1) + 
         this.height * (y - 1); 
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

//var board = new Board(8,8);
//board.set({name:'pawn'}, [8,8]);
//log(board.get([8,8]));
var ruleEngine = new RuleEngine();
//log(ruleEngine.validators.knight.lShape([0,0],[1,2]));
//log(ruleEngine.validators.knight.lShape([1,2],[2,1]));
//log('straight line: ',ruleEngine.validators.queen.straightLine([1,2],[2,2]));
log('diagonal: ',ruleEngine.validators.queen.diagonal([1,3],[5,7]));
