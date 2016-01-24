var game_objects = require('./game_objects');
var Piece = game_objects.Piece;
var Board = game_objects.Board;
var RuleEngine = game_objects.RuleEngine;
var Player = game_objects.Player;

var board = this._board = new Board(8,8);
var player1 = new Player(board);
var player2 = new Player(board);


