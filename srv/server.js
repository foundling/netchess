#!/usr/bin/node
'use strict';

var PORT = 5000,
    http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    EE = require('events').EventEmitter;


var gamesTable = require('./gamesTable');

var connections = null;

var move = {
  src: null,
  dst: null,
  emitter: new EE()
};


var hackParse = function(obj) {
    return JSON.parse(Object.keys(obj)[0]);
};

var pprint = function(obj) {
    return JSON.stringify(obj,null,2);
};

// GET request handlers
// static routes that just dish out html files. Soon to be converted to an SPA.

app
.use(bodyParser({extended:true})) 
.use('/styles', express.static(__dirname + '/public/styles'))
.use('/js',     express.static(__dirname + '/public/js'))
.use('/img',    express.static(__dirname + '/public/img'));

app
.get('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/');
    res.sendFile(__dirname + '/public/landing.html');
})
.get('/game', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/game');
    res.sendFile(__dirname + '/public/game.html');
})
.get('/join', function(req, res) {
    // this is for player2
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/join');
    res.sendFile(__dirname + '/public/join.html');
})
.get('/setup', function(req, res) {
    // PLAYER 1 sends to here
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/setup');
    res.sendFile(__dirname + '/public/setup.html');
});


// post request handling
app
.post('/player1', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    var reqData = hackParse(req.body);
    console.log(reqData);
 
    // register with gameTable 
    var token = gamesTable.getToken();
    gamesTable.initGame(token);
    gamesTable.addPlayer(token, reqData.player, reqData.alias);

    // setup for player1
    // player sends chosen alias, we send back that, plus player, alias and gameToken 
    var resData = {
      alias: reqData.alias,
      player: reqData.player,
      token: token 
    };
    res.json(resData);

    console.log('/player1');
    console.log('got: \n', reqData);
    console.log('game state: \n', gamesTable.show());

})
.post('/player2', function(req, res) {
    // setup for player2
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    var reqData = hackParse(req.body);

    console.log('/player2');
    console.log('got: \n', reqData);

    // update game state
    var token = reqData.token;
    var player = reqData.player;
    var alias = reqData.alias;
    gamesTable.addPlayer(token, player, alias);
    console.log('game state: \n', gamesTable.show());

    var resData = {
        player: reqData.player,
        alias:  reqData.alias,
        token:  reqData.token
    };
    res.json(resData);

})
.post('/update', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/update');

    var reqData = hackParse(req.body);

    if (reqData.init && reqData.userData.player === 'player2') { 
        console.log('player2 init');
        connections = [res];
        console.log('num connections on init: ',connections.length);
    } else {
        // add this request to front of queue
        connections.splice(0,0,res);
        // update the move
        move.src = reqData.move.src;
        move.dst = reqData.move.dst;
        // emit the change event 
        move.emitter.emit('change');
    }
});

move.emitter.on('change', function(){
    var res = connections.pop();
    console.log('move: ',move);
    res.json(JSON.stringify(move));
    console.log('num connections on update: ',connections.length);
});

http.createServer(app).listen(PORT, function() {
    console.log('SERVER UP ON PORT', PORT);
});
