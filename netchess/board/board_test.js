'use strict';

var Board = require('./board');
var board = new Board(8,8);

var king = {
  name:'king',
  position: [0,4]
};

board.setPiece(king);
console.log(board);
console.log(board.getPiece([0,4]));
