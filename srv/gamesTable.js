var _ = require('underscore');

var gameTemplate = {

    player1: {
        alias: null,
        move: null
    },

    player2: {
        alias: null,
        move: null
    }
};


var token = 1234;
var map = {};
var gamesTable = {

    _incrementToken: function() {
        token += 1;
    },

    getToken: function() {
        this._incrementToken();
        return token;
    },

    initGame: function(token) {
        map[token] = _.clone(gameTemplate);
    },

    addPlayer: function(token, player, alias) {
        if (! /player[1,2]/.test(player)) return false;
        map[token][player]['alias'] = alias;
    },
    show: function() {
        return JSON.stringify(map,null,2);
    }
};


module.exports = exports = gamesTable;
