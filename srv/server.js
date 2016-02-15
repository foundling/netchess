#!/usr/bin/node

var PORT = 5000,
    http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

var games = {};
currentGameToken = 1234;
// each game is filed under the gametoken hash

var hack = function(reqBody) {
    return JSON.parse(Object.keys(reqBody)[0]);   
};


var update = function(moveData){
    
};

// middleware
app
.use(bodyParser({extended:true})) 
.use('/styles', express.static(__dirname + '/public/styles'))
.use('/js',     express.static(__dirname + '/public/js'))
.use('/img', express.static(__dirname + '/public/img'));

// get request handlers
app
.get('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    if (req.method === 'GET') {
        res.sendFile(__dirname + '/public/landing.html');
    }
})
.get('/game', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/game');
    if (req.method === 'GET') {
        res.sendFile(__dirname + '/public/game.html');
    }
})
.get('/join', function(req, res) {
    // this is for player2
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/join');
    res.sendFile(__dirname + '/public/join.html');
})
.get('/setup', function(req, res) {
    // this is for player1
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/setup');
    res.sendFile(__dirname + '/public/setup.html');
})
.get('/login', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/login');
    res.sendFile(__dirname + '/public/login.html');
});


// post request handling
app
.post('/player1', function(req, res) {
    // setup for elayer1
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/player1');
    var data = hack(req.body);
    res.json({
        gameToken: currentGameToken++,
    });

    games[gameToken] = {
        player1: {
            alias: data.username,
        } 
    };
})
.post('/player2', function(req, res) {
    // setup for player2
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/player2');
    var data = hack(req.body);
    res.json({
        gameToken: data.gameToken,
        player1: game[gameToken][player1],
    });
})
.post('/update', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/update');
    // figure out why bodyParser.json() results in an empty body, and
    // why this puts the stringified object into the object as a key with no value.
    var data = hack(req.body);
    var moveData = data.move;
    var gameToken = data.gameToken;
    var player = data.player; 
    var alias = data.alias;
    console.log('post: ', moveData);

    // insert long polling of type application/json here instead of an immediate response
    res.writeHead(200,{'Content-type':'application/json'}); 
    return res.end(JSON.stringify(req.body));
});

http.createServer(app).listen(PORT, function() {
    console.log('SERVER UP ON PORT', PORT);
});
