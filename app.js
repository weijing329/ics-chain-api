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
global.TransferRecord = require('./lib/contracts/TransferRecord.js');
global.ClaimRecordStatusWater = require('./lib/workflow_status_watcher/ClaimRecordStatus.js');

global.io = io;

global.LogTimeMsg = function (msg) {
  var now = moment();
  var log_msg = now.format('YYYY-MM-DD HH:mm:ss.SSS Z') + ' ' + msg;
  console.log(log_msg);
}

// socket.io
// Default namespace (/)
// Default path (/socket.io)

//Emits an event to all connected clients.
// io.sockets.emit('an event sent to all connected clients');
// io.emit('an event sent to all connected clients');

// broadcast() only can be use when knowing which socket sending from 
// socket.broadcast(); send the message to all the other clients except the 'broadcasting' socket

var allClients = [];
var clients_count = 0;
var client_keepalive_timers = {};
io.on('connection', function(socket){
  allClients.push(socket);
  clients_count = allClients.length;

  var client_IP = socket.request.connection.remoteAddress;
  var client_port = socket.request.connection.remotePort

  client_keepalive_timers[socket.id] = setInterval(sendHeartbeat, 2000);
  function sendHeartbeat(){
    var now = moment();
    var new_beat = now.format('YYYY-MM-DD HH:mm:ss.SSS Z') + ' Ping sent from server';
    io.sockets.emit('KA_ping', { new_beat : new_beat });
  }

  socket.on('disconnect', function() {
    clearInterval(client_keepalive_timers[socket.id]);

    var i = allClients.indexOf(socket);
    allClients.splice(i, 1);
    clients_count = allClients.length;

    var now = moment();
    console.log(now.format('YYYY-MM-DD HH:mm:ss.SSS Z') + ' socket.id = ' + socket.id + ' Disconnected, ' + clients_count + ' client(s) connected');
  });
  
  var now = moment();
  console.log(now.format('YYYY-MM-DD HH:mm:ss.SSS Z') + ' New connection from ' + client_IP + ':' + client_port + ', socket.id = ' + socket.id + ', ' + clients_count + ' client(s) connected');
  //socket.to('others').emit('an event', { some: 'data' });

  socket.on('KA_pong', function(data){
    var now = moment();
    var alive = now.format('YYYY-MM-DD HH:mm:ss.SSS Z') + ' Pong received from client';
    io.sockets.emit('KA_alive', { alive : alive });
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
