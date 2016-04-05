'use strict';

/*
 * Rule Engine:
 *
 * roll: validates a src to dst move for a given piece 
 *
 *
 */
var ruleEngine = {

  validators: {

    pawn: [
      function single(player, startPos, endPos) {
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        return (player === 'player1' && deltaX === 0 && deltaY === -1 ||
                player === 'player2' && deltaX === 0 && deltaY === 1);
      },
      function double(player,startPos, endPos) {
          
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        console.log(deltaX,deltaY);
        return  player === 'player1' && startPos[1] !== 6 || // if pawn not moving from first position
                player === 'player2' && startPos[1] !== 1 || // then validate as true 
                player === 'player1' && deltaX === 0 && deltaY === -2 ||
                player === 'player2' && deltaX === 0 && deltaY === 2;
      },
/*
      function capture(player, startPos, endPos) {
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        return Math.abs(deltaX === 1) && deltaY === 1;
      }
*/
    ],
    knight: [
      function lShape(player, startPos, endPos) {
        var deltaX = Math.abs(endPos[0] - startPos[0]);
        var deltaY = Math.abs(endPos[1] - startPos[1]);
        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
        return hypotenuse === Math.sqrt(5);
      }
    ],

    queen: [
      function straightLine(player, startPos, endPos) {
        var startX = startPos[0];
        var startY = startPos[1];
        var endX = endPos[0];
        var endY = endPos[1];
        // do either the x coords or y coords remain the same? 
        return  (startX === endX) || (startY === endY);  
      },
      function diagonal(player, startPos, endPos) {
        var deltaX = Math.abs(endPos[0] - startPos[0]);
        var deltaY = Math.abs(endPos[1] - startPos[1]);
        // is the absolute change in x the same as the absolute change in y?
        return deltaX === deltaY;
      },

    ],
    king: [
      function oneSpace(player, startPos, endPos) {
        var deltaX = Math.abs(startPos[0] - endPos[0]);
        var deltaY = Math.abs(startPos[1] - endPos[1]);
        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));       
        console.log(deltaX,deltaY,hypotenuse);
        return (hypotenuse === 1) || (hypotenuse === Math.sqrt(2));
      }
    ]
  }
};

ruleEngine.validate = function(player, pieceType, src, dst) {

    /* 
       takes in a pieceType, src and dst dom element.
       gets the pieceType from the dst element
       takes the square number from src and dst id's 
       converts square numbers to x,y coordinates, and validates by piece type
       on src and dst x,y coords 
    */

    var startSquare = parseInt(src.id.replace('sq',''));
    var startX = startSquare % 8;
    var startY = Math.floor(startSquare / 8);

    var endSquare = parseInt(dst.id.replace('sq',''));
    var endX = endSquare % 8;
    var endY = Math.floor(endSquare / 8);

    var validatorFunctions = this.validators[pieceType];

    return validatorFunctions.every(function(func) {
        return func(player, [startX, startY], [endX, endY]);
    });
};

module.exports = exports = ruleEngine;
