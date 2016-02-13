#!/usr/bin/node

var PORT = 5000,
    connect = require('connect'),
    http = require('http'),
    app = connect(),
    serveStatic = require('serve-static'),
    serve = serveStatic('public'),
    jsonParser = require('body-parser'); 

app.use(serve);
http.createServer(app).listen(PORT, function() {
    console.log('SERVER UP ON PORT', PORT);
});
