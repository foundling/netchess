#!/usr/bin/node

var PORT = 5000,
    connect = require('connect'),
    http = require('http'),
    app = connect(),
    serveStatic = require('serve-static'),
    jsonParser = require('body-parser'); 


var serve = serveStatic('public');
app.use(serve);

app.use('/game', function(req, res, next) {
    console.log('/game request');
});

app.use('/update', function(req, res, next) {
    console.log('/update request');
});

http.createServer(app).listen(PORT, function() {
    console.log('SERVER UP ON PORT', PORT);
});
