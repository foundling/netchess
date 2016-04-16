'use strict';

var currentPlayer = 'player1';

var gameEngine = {
    itsYourTurn: function(you) {
        return you === currentPlayer;
    },
    whoseMove: function() {
        return currentPlayer;
    },
    update: function() {
        currentPlayer = (currentPlayer === 'player1') ? 'player2' : 'player1';
    }
};

module.exports = exports = gameEngine;
