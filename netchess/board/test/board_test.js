'use strict';

var mocha = require('mocha');
var expect = require('chai').expect;

var Board = require('./board');

describe('board initialization', function(){
  it('should have H arrays, each of length W', function() {
    var H = 8,
        W = 8;
    var board = new Board(H,W);
    
  });
});

describe('board.setPiece(piece)', function(){

  it('should place the piece on the board at the x,y coordinates specified by piece.position', function() {

    var board = new Board(8,8);
    var king = {
      name:'king',
      position: [0,4]
    };
    var x = king.position[0],
        y = king.position[1];

    expect(board._board[x][y]).to.eql(undefined);
    board.setPiece(king); 
    expect(board._board[x][y]).to.eql(king);

  });

});

describe('board.getPiece(position)', function(){

  it('should return the object at the position specified by position coordinate array', function() {

    var board = new Board(8,8);
    var king = {
      name:'king',
      position: [0,4]
    };
    var x = king.position[0],
        y = king.position[1];

    expect(board.getPiece(king.position)).to.eql(undefined); 
    board.setPiece(king);
    expect(board.getPiece(king.position)).to.eql(king); 

  });

});

