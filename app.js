'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var server = require('http').Server(app);
var io = require('socket.io')(server),
    util = require('util'),
    bodyParser = require('body-parser');

var config = {
  appRoot: __dirname // required config
};

// socket.io
// Default namespace (/)
// Default path (/socket.io)

//Emits an event to all connected clients.
// io.sockets.emit('an event sent to all connected clients');
// io.emit('an event sent to all connected clients');

io.on('connection', function(socket){
  console.log('Client connected');
  //socket.to('others').emit('an event', { some: 'data' });

  socket.on('messaging', function (data) {
    console.log('messaging: ' + data);

    socket.emit('messaging', 'message received');

    socket.broadcast.emit('application', { name: data });
  });

  socket.on('application', function (data) {
    console.log('application: ' + data);

    socket.broadcast.emit('ack', { name: data });
  });

  socket.on('ack', function (data) {
    console.log('ack: ' + data);
  });
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  server.listen(port);
  console.log("Server listening on port: " + port);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/api/hello?name=Scott');
  }
});
