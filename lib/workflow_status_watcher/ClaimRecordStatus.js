'use strict';

var util = require('util');
var CronJob = require('cron').CronJob;

module.exports = {
  Init: Init
};

var event_listener = undefined;
var event_listener_processing = false;

function Init() {
  var job = new CronJob({
    cronTime: '0,30 * * * * *',
    onTick: function() {
      /*
      * Runs everyday (Monday through Friday)
      * every minute on 0, 30 secs
      */
      KeepEventListenerAlive();
    },
    start: true,
    timeZone: 'Asia/Taipei',
    runOnInit: true
  });
  job.start();
}

function KeepEventListenerAlive() {
  if (!event_listener_processing) {
    if (event_listener !== undefined) {
      event_listener.stopWatching();
    }

    StartEventListener();
  }
}

function StartEventListener() {
  var ContractObject = ClaimRecord._originalContractObject;
  var event_name = 'e_SetStatusCode';

  event_listener = ContractObject[event_name]({});
  event_listener.watch(function (err, logs) {
    event_listener_processing = true;

    if (!err) {
      io.sockets.emit('ClaimRecordStatusChange', JSON.stringify(logs.args));
    } else {

    }

    event_listener_processing = false;
  });

  LogTimeMsg('ClaimRecordStatusChange event listener (re)started');
}