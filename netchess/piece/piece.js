'use strict';

var Piece = function(name, position, pieceMoves){
  this.name = name;
  this.position = position;
  this.pieceMoves = pieceMoves;
  this.alive = true;
  this.next = function() {};
}; 



module.exports = exports = Piece;
