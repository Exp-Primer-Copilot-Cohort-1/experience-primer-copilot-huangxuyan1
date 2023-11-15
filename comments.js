// Create web server
// Usage: node comments.js

// Import modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var qs = require('querystring');

// Import custom modules
var Comment = require('./comment.js');

// Create web server
http.createServer(function (req, res) {
  var uri = url.parse(req.url).pathname;
  if (uri === '/') {
    // Serve index.html
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('index.html').pipe(res);
  } else if (uri === '/comments') {
    // Serve comments
    if (req.method === 'GET') {
      // Get comments
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(Comment.getComments()));
    } else if (req.method === 'POST') {
      // Add comment
      var body = '';
      req.on('data', function (chunk) {
        body += chunk;
      });
      req.on('end', function () {
        var comment = qs.parse(body);
        Comment.addComment(comment);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(comment));
      });
    }
  } else {
    // Serve static files
    var filename = path.join(process.cwd(), uri);
    fs.exists(filename, function (exists) {
      if (!exists) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found\n');
        return;
      }
      if (fs.statSync(filename).isDirectory()) {
        filename += '/index.html';
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream(filename).pipe(res);
    });
  }
}).listen(8080);
console.log('Server running at http://localhost:8080');