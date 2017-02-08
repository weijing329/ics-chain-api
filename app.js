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

global.moment = require('moment');

global.web3 = require('./lib/web3_connector.js');
global.EmbarkJS = require('./lib/embark.js');
global.Government = require('./lib/contracts/Government.js');
global.Person = require('./lib/contracts/Person.js');
global.Enrollment = require('./lib/contracts/Enrollment.js');
global.ContractTerm = require('./lib/contracts/ContractTerm.js');
global.InsurancePolicy = require('./lib/contracts/InsurancePolicy.js');
global.MedicalRecord = require('./lib/contracts/MedicalRecord.js');
global.ClaimRecord = require('./lib/contracts/ClaimRecord.js');
global.ClaimRecordStatusWater = require('./lib/workflow_status_watcher/ClaimRecordStatus.js');

global.io = io;

// socket.io
// Default namespace (/)
// Default path (/socket.io)

//Emits an event to all connected clients.
// io.sockets.emit('an event sent to all connected clients');
// io.emit('an event sent to all connected clients');

// broadcast() only can be use when knowing which socket sending from 
// socket.broadcast(); send the message to all the other clients except the 'broadcasting' socket

io.on('connection', function(socket){
  var now = moment();
  
  console.log(now.format('YYYY-MM-DD HH:mm:ss.SSS Z') + ' Client connected');
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

  ClaimRecordStatusWater.Init();
});
