'use strict';

var util = require('util');

module.exports = {
  GetContractTermInfo: GetContractTermInfo,
  GetContractTermHash: GetContractTermHash,
  GetContractTerm: GetContractTerm,
  SetContractTerm: SetContractTerm
};

function GetContractTermInfo(req, res) {
  var ContractObject = ContractTerm._originalContractObject;

  var row_count = ContractObject.GetRowCount().toNumber();
  var row_CPKs = [];

  for (var i = 0; i < row_count; i++) {
    var row_CPK = ContractObject.GetRowKey(i);
    row_CPKs.push(row_CPK);
  }

  var TableInfo = {
    row_count: row_count,
    row_CPKs: row_CPKs
  };

  res.json(TableInfo);
}

function GetContractTermHash(req, res) {
  var row_CPK = req.swagger.params.row_CPK.value || '';

  var ContractObject = ContractTerm._originalContractObject;

  // TODO 看是不是先讀取queue內是否有相同contract的寫入時間，以queue內的資料當作是最新的。
  var row_data_hash = ContractObject.GetTableRowDataHash(row_CPK);

  var TableRowDataHash = {
    row_CPK: row_CPK,
    row_data_hash: row_data_hash
  };

  res.json(TableRowDataHash);
}

function GetContractTerm(req, res) {
  var row_CPK = req.swagger.params.row_CPK.value || '';
  var row_data_hash = req.swagger.params.hash.value || '';

  var ContractObject = ContractTerm._originalContractObject;

  var row_data = ContractObject.GetTableRowData(row_CPK, row_data_hash);

  var TableRowData = {
    row_CPK: row_CPK,
    row_data_hash: row_data_hash,
    row_data: row_data
  };

  var claim_adjustment = ContractObject.Get_claim_adjustment(row_CPK).toNumber();

  var ContractTermResponse = {
    table_row: TableRowData,
    claim_adjustment: claim_adjustment
  };

  res.json(ContractTermResponse);
}

function SetContractTerm(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var contract_term = req.swagger.params.contract_term.value;
  var claim_adjustment = req.swagger.params.contract_term.value.claim_adjustment;

  var row_CPK = contract_term.table_row.row_CPK || '';
  var row_data = contract_term.table_row.row_data || '';

  var ContractObject = ContractTerm._originalContractObject;
  var set_function = 'SetContractTerm';
  var set_event = 'e_SetTableRowData';

  // ToDo: 資料內容檢查

  var row_CPK_hash = web3.sha3(row_CPK);

  // var start_date = moment();

  var event_listener = ContractObject[set_event]({
    row_CPK_hash: web3.sha3(row_CPK)
  });
  event_listener.watch(function (err, logs) {
    if (!err) {
      // addBoldToLog('[完成] ' + function_name);

      // var end_date = moment();
      // addMomentToLog(end_date);
      // var diff_microseconds = end_date.diff(start_date);
      // addToLog('time span: ' + diff_microseconds + ' ms');

      // var txHash = logs.transactionHash;
      // var web3_TransactionReceipt = web3.eth.getTransactionReceipt(txHash);

      io.sockets.emit('SetContractTerm', JSON.stringify(logs.args) );

    } else {

    }
    event_listener.stopWatching();
  });

  var txHash = ContractObject[set_function](row_CPK, row_data, claim_adjustment, {gas: 4141592});


  // var pending_date = moment();
  // var diff_microseconds = pending_date.diff(start_date);
  //addToLog('time span: ' + diff_microseconds + ' ms');

  //var web3_Transaction = web3.eth.getTransaction(txHash);

  var TransactionResponse = {
    txHash: txHash
  };
  res.json(TransactionResponse);

}

function NotImplemented(req, res) {
  res.json('Not implemented');
}