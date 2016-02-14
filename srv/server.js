#!/usr/bin/node

var PORT = 5000,
    connect = require('connect'),
    http = require('http'),
    app = connect(),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    serve = serveStatic('public');

app
.use(bodyParser({extended:true})) // figure out why bodyParser.json() results in an empty body, but this works.
.use('/update', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    if (req.method === 'POST') {
        console.log('post: ', req.body);

        // insert long polling of type application/json here instead of an immediate response
        res.writeHead(200,{'Content-type':'application/json'}); 
        return res.end(JSON.stringify(req.body));
    } else {
      next();
    }
})
.use('/',serve);

http.createServer(app).listen(PORT, function() {
    console.log('SERVER UP ON PORT', PORT);
});
