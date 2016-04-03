'use strict';

/*
 * Rule Engine:
 *
 * roll: validates a src to dst move for a given piece 
 *
 *
 */
var RuleEngine = function() {

  this.validators = {

    pawn: [
      function single(startPos, endPos) {
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        return deltaX === 0 && deltaY === 1;
      },
      function doubleStart(startPos, endPos) {
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        return deltaX === 0 && deltaY === 2;
      },
      function capture(startPos, endPos) {
        var deltaX = endPos[0] - startPos[0];  
        var deltaY = endPos[1] - startPos[1];
        return Math.abs(deltaX === 1) && deltaY === 1;
      }
    ],
    knight: [
      function lShape(startPos, endPos) {
        var deltaX = Math.abs(endPos[0] - startPos[0]);
        var deltaY = Math.abs(endPos[1] - startPos[1]);
        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
        return hypotenuse === Math.sqrt(5);
      }
    ],

    queen: [
      function straightLine(startPos, endPos) {
        var startX = startPos[0];
        var startY = startPos[1];
        var endX = endPos[0];
        var endY = endPos[1];
        // do either the x coords or y coords remain the same? 
        return  (startX === endX) || (startY === endY);  
      },
      function diagonal(startPos, endPos) {
        var deltaX = Math.abs(endPos[0] - startPos[0]);
        var deltaY = Math.abs(endPos[1] - startPos[1]);
        // is the absolute change in x the same as the absolute change in y?
        return deltaX === deltaY;
      },

    ],
    king: [
      function oneSpace(startPos, endPos) {
        var deltaX = Math.abs(startPos[0] - endPos[0]);
        var deltaY = Math.abs(startPos[1] - endPos[1]);
        var hypotenuse = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));       
        console.log(deltaX,deltaY,hypotenuse);
        return (hypotenuse === 1) || (hypotenuse === Math.sqrt(2));
      }
    ]
  };
};

RuleEngine.prototype.validate = function(pieceType, src, dst) {
    console.log(pieceType);

    /* 
       takes in a pieceType, src and dst dom element.
       gets the pieceType from the dst element
       takes the square number from src and dst id's 
       converts square numbers to x,y coordinates, and validates by piece type
       on src and dst x,y coords 
    */

    var startSquare = parseInt(src.id.replace('sq',''));
    var startX = startSquare % 8;
    var startY = Math.floor(startSquare / 8) + 1;

    var endSquare = parseInt(dst.id.replace('sq',''));
    var endX = endSquare % 8;
    var endY = Math.floor(endSquare / 8) + 1;

    var validatorFunctions = this.validators[pieceType];

    return validatorFunctions.every(function(func) {
        var result = func([startX, startY], [endX, endY]);
        console.log(result);
        return result;
    });
};

module.exports = exports = RuleEngine;
