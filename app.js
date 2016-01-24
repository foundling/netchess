var Piece = require('./piece');
var Player = require('./player');
var Board = require('./board');
var GameEngine = require('./game_engine');

var board = new Board(8,8);
var player1 = new Player(board);
var player2 = new Player(board);
var gameEngine = new GameEngine(board,player1,player2);
console.log(board.toString());
