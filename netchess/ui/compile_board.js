#!/usr/bin/node

var h = require('handlebars'),
    fs = require('fs'),
    pieces = {

        // black pieces
        0: 'br',
        1: 'bkn',
        2: 'bb',
        3: 'bq',
        4: 'bk',
        5: 'bb',
        6: 'bkn',
        7: 'br',
        8: 'bp',
        9: 'bp',
        10: 'bp',
        11: 'bp',
        12: 'bp',
        13: 'bp',
        14: 'bp',
        15: 'bp',

        // white pieces
        48: 'wr',
        49: 'wkn',
        50: 'wb',
        51: 'wk',
        52: 'wq',
        53: 'wb',
        54: 'wkn',
        55: 'wr',
        56: 'wp',
        57: 'wp',
        58: 'wp',
        59: 'wp',
        60: 'wp',
        61: 'wp',
        62: 'wp',
        63: 'wp',
    };


function prop(obj, key, options) {

    return (obj[key]) ? ' piece-' + obj[key] : '';
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


[prop, range, rowNum, rowStart, rowEnd].forEach(function(f) {
    h.registerHelper(f.name,f);
});

var partial = fs.readFileSync('board.template').toString('utf8');
var template = h.compile(partial);
var output = template(pieces);
console.log(output);
