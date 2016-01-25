'use strict';

var Piece = function(name, position){

  this.name = name;
  this.position = position;
  this.alive = true;
  this.next = function() {};
}; 

module.exports = exports = Piece;
