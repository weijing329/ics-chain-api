'use strict';

var util = require('util');

module.exports = {
  GetPerson: GetPerson,
  SetPerson: SetPerson
};

function GetPerson(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var person_code = req.swagger.params.person_code.value || '';

  // TODO 看是不是先讀取queue內是否有相同contract的寫入時間，以queue內的資料當作是最新的。

  Government.GetPerson(person_code).then(function (person_data_hash) {
    if (person_data_hash != 0x0000000000000000000000000000000000000000) {
      console.log(person_data_hash);
      //var result = util.format("GetPerson('%s') = %s", person_code, person_hash);
      var PersonOutputObject = {
        person_code: person_code,
        person_data_hash: person_data_hash
      };
      res.json(PersonOutputObject);
    } else {
      res.json('N/A');
    }
  });

}

function SetPerson(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var person_code = req.swagger.params.person.person_code || '';
  var person_data = req.swagger.params.person.person_data || '';

  // ToDo: 資料內容檢查

  var person_data_hash = web3.sha3(person_data);

  var e_SetPerson_listener = Person._originalContractObject.e_SetPerson({
    person_code_hash: web3.sha3(person_code)
  });
  e_SetPerson_listener.watch(function (err, logs) {
    if (!err) {
      var PersonOutputObject = {
        person_code: person_code,
        person_data_hash: person_data_hash
      };
      io.sockets.emit('e_SetPerson', PersonOutputObject);
    } else {
      // log err
    }
    e_SetPerson_listener.stopWatching();
  });
  Government.SetPerson(person_code, person_data_hash).then(function (txHash) {
    var TransactionResponse = {
      txHash: txHash
    };
    res.json(TransactionResponse);
  });
}