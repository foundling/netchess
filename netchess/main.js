'use strict';

var Piece = require('./piece/piece');
var Player = require('./player/player');
var Board = require('./board/board');
var GameEngine = require('./engine/game_engine');

var run = function() {

  /*
  var board = new Board(8,8);
  var player1 = new Player('player1','near',board);
  var player2 = new Player('player2','far',board);
  var gameEngine = new GameEngine(board,player1,player2);
  gameEngine.mainLoop();
  */

};

module.exports = exports = {
  run: run
};
