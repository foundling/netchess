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

RuleEngine.prototype.validate = function(pieceType, src, dst) {
    // if some return false, it's false.
    var valid,
        startPos = parseInt(src.id.replace('sq','')),
        endPos = parseInt(dst.id.replace('sq',''));

    var startSquare = parseInt(src.id.replace('sq',''));
    var startX = startSquare % 8;;
    var startY = Math.floor(startSquare / 8) + 1;

    var endSquare = parseInt(dst.id.replace('sq',''));
    var endX = endSquare % 8;;
    var endY = Math.floor(endSquare / 8) + 1;
    console.log(endX,endY);

    /*
    valid = Object.keys(this.validators[pieceType]).every(function(funcName) {
        return this.validators[pieceType][funcName](startPos, endPos);
    });

    */
    return true;
};

module.exports = exports = RuleEngine;
