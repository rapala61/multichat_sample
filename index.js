var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function( req, res ) {
  res.sendFile(__dirname + '/public/views/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('new chat message', function( msg ) {
    console.log(msg.chatId, msg.from, msg.content);
    io.emit('new chat message', msg);
  });
});

var port = 3001;
http.listen(port, function() {
  console.log('magic at ' + port);
});
