#!/usr/bin/node

var h = require('handlebars'),
    fs = require('fs'),
    pieces = {

        // black pieces
        0: 'black-rook',
        1: 'black-knight',
        2: 'black-bishop',
        3: 'black-queen',
        4: 'black-king',
        5: 'black-bishop',
        6: 'black-knight',
        7: 'black-rook',
        8: 'black-pawn',
        9: 'black-pawn',
        10: 'black-pawn',
        11: 'black-pawn',
        12: 'black-pawn',
        13: 'black-pawn',
        14: 'black-pawn',
        15: 'black-pawn',

        // white pieces
        48: 'white-pawn',
        49: 'white-pawn',
        50: 'white-pawn',
        51: 'white-pawn',
        52: 'white-pawn',
        53: 'white-pawn',
        54: 'white-pawn',
        55: 'white-pawn',
        56: 'white-rook',
        57: 'white-knight',
        58: 'white-bishop',
        59: 'white-king',
        60: 'white-queen',
        61: 'white-bishop',
        62: 'white-knight',
        63: 'white-rook',
    };


function prop(obj, key, options) {

    return (obj[key]) ? ' piece-' + obj[key] : '';
}

function whichPlayer(obj, key, options) {
    var player;

    if (obj[key]) {
        player = (obj[key][0] === 'w') ? 'player1' : 'player2';
    }

    return player || '';
}

function range(max, options) {
  var rv = "";

  for(var i=0; i<max; i++) {
      rv += options.fn(i);
  }

  return rv;
}

function rowNum(squareNumber, options) {
    return (squareNumber === 0) ? squareNumber : Math.floor(squareNumber / 8);
}

function rowStart(squareNumber, options) {
    var rv = '';

    if ( (squareNumber % 8) === 8 || (squareNumber % 8) === 0){
        rv += options.fn();    
    }
    return rv;
}

function rowEnd(squareNumber, options) {
    var rv = '';

    if ((squareNumber + 1) % 8 === 0){
        rv += options.fn();
    }

    return rv;
}


[prop, range, rowNum, rowStart, rowEnd, whichPlayer].forEach(function(f) {
    h.registerHelper(f.name,f);
});

var partial = fs.readFileSync('board.template').toString('utf8');
var template = h.compile(partial);
var output = template(pieces);
console.log(output);
