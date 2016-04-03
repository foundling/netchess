'use strict';

var RuleEngine = require('./rule_engine'); 

var GameEngine = function(board, player1, player2) {
  // duties:  
  // handle turns, ref the game (mark players dead, determine checkmate, reverse board on each turn)

  this.gameState = {
    whoseMove: player1.name,    
    gameOver: false,
    currentMove: {
      'from': null,
      'to': null
    },
    total : 0,
  };

  this.ruleEngine = new RuleEngine();
  this.board = board;
  this.addEventListener('move', function() {
      console.log('move request');
  });
};

GameEngine.prototype.getNextMove = function() {
    process.stdout.write(this.gameState.whoseMove + ': ');
    process.stdin.once('data', function(data) {
      var move,
          from,
          to;

      move = data.toString().split(' '); //input sample:  1,2 1,3
      from = move[0];
      to = move[1];
      this.gameState.currentMove = { from: from, to: to }; 
      this.mainLoop();
    }.bind(this));
};

GameEngine.prototype.refreshDisplay = function() {
  this.gameState.total++;
  console.log(this.board.toString());
  this.gameState.whoseMove = (this.gameState.whoseMove === 'player1') ? 'player2' : 'player1';
};

GameEngine.prototype.mainLoop = function() {
  if (this.gameState.total == 5) /*this.gameOver)*/ process.exit();
  this.refreshDisplay();
  this.getNextMove();
};

module.exports = exports = GameEngine;
