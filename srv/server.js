#!/usr/bin/node

var PORT = 5000,
    connect = require('connect'),
    http = require('http'),
    app = connect(),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    serve = serveStatic('public');

app.use(serve);
app.use(bodyParser.json());

app.use('/update', function(req, res, next) {
    if (req.method === 'POST') {
        res.writeHead(200,{'Content-type':'text/plain'}); 
        res.write('you said: ' + req.body.hello);
    }
    next();
    return res.end();
});

http.createServer(app).listen(PORT, function() {
    console.log('SERVER UP ON PORT', PORT);
});
