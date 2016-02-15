#!/usr/bin/node

var PORT = 5000,
    http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

var gamesTable = require('./gamesTable');

var hackParse = function(obj) {
    return JSON.parse(Object.keys(obj)[0]);
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
      gameToken: token 
    };
    res.json(resData);

    console.log('/player1');
    console.log('got: \n', reqData);
    console.log('game state: \n', gamesTable.showGamesTable());

})
.post('/player2', function(req, res) {
    // setup for player2
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    var reqData = hackParse(req.body);

    console.log('/player2');
    console.log('got: \n', reqData);
    console.log('game state: \n', games[reqData.gameToken]);

    // update game state
    games[reqData.gameToken].player2 = {
        alias: reqData.alias,
        move: null
    };

    var resData = {
        player: 'player2',
        alias:   reqData.alias,
        gameToken: reqData.gameToken
    };
    res.json({
    });
})
.post('/update', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    console.log('/update');
    // figure out why bodyParser.json() results in an empty body, and
    // why this puts the stringified object into the object as a key with no value.
    var data = hackParse(req.body);
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
