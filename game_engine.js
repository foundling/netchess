var RuleEngine = function() {

  this.validators = {

    pawn: {

      single: function(startPos, endPos) {
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        return deltaX === 0 && deltaY === 1;
      },

      doubleStart: function(startPos, endPos) {
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        return deltaX === 0 && deltaY === 2;
      },

      capture: function(startPos, endPos) {
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        return Math.abs(deltaX === 1) && deltaY === 1;
      }

    },

    knight: {

      lShape: function(startPos, endPos) {
        var deltaX = Math.abs(endPos[0] - startPos[0]);
        var deltaY = Math.abs(endPos[1] - startPos[1]);
        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
        return hypotenuse === Math.sqrt(5);
      }

    },

    queen: {

      straightLine: function(startPos, endPos) {
        var startX = startPos[0];
        var startY = startPos[1];
        var endX = endPos[0];
        var endY = endPos[1];
        // do either the x coords or y coords remain the same? 
        return  (startX === endX) || (startY === endY);  
      },

      diagonal: function(startPos, endPos) {
        var deltaX = Math.abs(endPos[0] - startPos[0]);
        var deltaY = Math.abs(endPos[1] - startPos[1]);
        // is the absolute change in x the same as the absolute change in y?
        return deltaX === deltaY;
      },

    },

    king: {

      oneSpace: function(startPos, endPos) {
        var deltaX = Math.abs(startPos[0] - endPos[0]);
        var deltaY = Math.abs(startPos[1] - endPos[1]);
        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));       
        console.log(deltaX,deltaY,hypotenuse);
        return (hypotenuse === 1) || (hypotenuse === Math.sqrt(2));
      },
    }

  };
};

// gameEngine
var GameEngine = function(board, player1, player2) {
  // duties:  
  // handle turns, ref the game (mark players dead, determine checkmate, reverse board on each turn)

  this.ruleEngine = new RuleEngine();
  this.board = board;

  this.initBoard = function() {
      this.board.initBoard();
  };

  this.rotateBoard = function() {

  };

  this.nextMove = function() {

  };

};

module.exports = exports = GameEngine;
