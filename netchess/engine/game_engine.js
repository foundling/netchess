'use strict';

var RuleEngine = require('./rule_engine'); 

var GameEngine = function(board, player1, player2) {
  // duties:  
  // handle turns, ref the game (mark players dead, determine checkmate, reverse board on each turn)

  this.gameState = {
    whoseMove: player1.name,    
    gameOver: false,
  };

  this.ruleEngine = new RuleEngine();
  this.board = board;
};

GameEngine.prototype.setup = function() {
      this.board.initBoard();
};

GameEngine.prototype.getNextMove = function() {
    var move,
        start,
        end;

    var that = this;
    process.stdin.once('data', function(data) {
      //nput:  1,2 1,3
      move = data.toString().split(' ');
      start = move[0];
      end = move[1];
      this.refreshDisplay();
    }.bind(this));
};

GameEngine.prototype.refreshDisplay = function() {
  console.log(this.board.toString());
  process.stdout.write(this.gameState.whoseMove + ': ');
  this.getNextMove(); 
  this.gameState.whoseMove = (this.gameState.whoseMove === 'player1') ? 'player2' : 'player1';
};

GameEngine.prototype.mainLoop = function() {
  while (!this.gameState.gameOver) {
    this.refreshDisplay();
  }
};

module.exports = exports = GameEngine;
