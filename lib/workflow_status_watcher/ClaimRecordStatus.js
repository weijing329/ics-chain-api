'use strict';

var util = require('util');

module.exports = {
  Init: Init
};

function Init() {
  var ContractObject = ClaimRecord._originalContractObject;
  var event_name = 'e_SetStatusCode';

  var event_listener = ContractObject[event_name]({});
  event_listener.watch(function (err, logs) {
    if (!err) {
      io.sockets.emit('ClaimRecordStatusChange', JSON.stringify(logs.args) );
    } else {

    }
  });
}