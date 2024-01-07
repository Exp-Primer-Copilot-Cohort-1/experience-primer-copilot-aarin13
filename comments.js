// create web server
// run the server: node comments.js
// open browser and go to http://localhost:3000
// to stop the server: ctrl+c

var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  var url_parts = url.parse(req.url, true);

  if(url_parts.pathname == '/comment') {
    fs.readFile('./comment.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if(url_parts.pathname == '/comment/add') {
    var comment = url_parts.query.comment;
    fs.readFile('./comments.txt', function(err, data) {
      var comments = data.toString().split('\n');
      comments.push(comment);
      fs.writeFile('./comments.txt', comments.join('\n'), function(err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Comments</h1>');
        res.write('<ul>');
        for(var i in comments) {
          res.write('<li>' + comments[i] + '</li>');
        }
        res.write('</ul>');
        res.end();
      });
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('Page not found');
    res.end();
  }
});

server.listen(3000);
console.log('Server running at http://localhost:3000');