var game_objects = require('./game_objects');

var Piece = game_objects.Piece;
var Board = game_objects.Board;
var RuleEngine = game_objects.RuleEngine;

var board = this._board = new Board(8,8);

var Opponent = function() {

  this.pieces = {
    pawn:   8,   
    king:   1,
    queen:  1,
    bishop: 2,
    knight: 2,
    rook:   2,
  };
  this._board = board;

  for (var piece in this.pieces) {
    for (var i = pieces[piece]; i > 0; i--) {

    }
  }

};
