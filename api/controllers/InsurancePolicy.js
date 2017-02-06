'use strict';

var util = require('util');

module.exports = {
  GetInsurancePolicyInfo: GetInsurancePolicyInfo,
  GetInsurancePolicyHash: GetInsurancePolicyHash,
  GetInsurancePolicy: GetInsurancePolicy,
  SetInsurancePolicy: SetInsurancePolicy
};

function GetInsurancePolicyInfo(req, res) {
  var ContractObject = InsurancePolicy._originalContractObject;

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

function GetInsurancePolicyHash(req, res) {
  var row_CPK = req.swagger.params.row_CPK.value || '';

  var ContractObject = InsurancePolicy._originalContractObject;

  // TODO 看是不是先讀取queue內是否有相同contract的寫入時間，以queue內的資料當作是最新的。
  var row_data_hash = ContractObject.GetTableRowDataHash(row_CPK);

  var TableRowDataHash = {
    row_CPK: row_CPK,
    row_data_hash: row_data_hash
  };

  res.json(TableRowDataHash);
}

function GetInsurancePolicy(req, res) {
  var row_CPK = req.swagger.params.row_CPK.value || '';
  var row_data_hash = req.swagger.params.hash.value || '';

  var ContractObject = InsurancePolicy._originalContractObject;

  var row_data = ContractObject.GetTableRowData(row_CPK, row_data_hash);

  var TableRowData = {
    row_CPK: row_CPK,
    row_data_hash: row_data_hash,
    row_data: row_data
  };

  var contract_address = ContractObject.Get_contract_address(row_CPK);

  var InsurancePolicyResponse = {
    table_row: TableRowData,
    contract_address: contract_address
  };

  res.json(InsurancePolicyResponse);
}

function SetInsurancePolicy(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var insurance_policy = req.swagger.params.insurance_policy.value;
  var contract_address = req.swagger.params.insurance_policy.value.contract_address;

  var row_CPK = insurance_policy.table_row.row_CPK || '';
  var row_data = insurance_policy.table_row.row_data || '';

  var ContractObject = InsurancePolicy._originalContractObject;
  var set_function = 'SetInsurancePolicy';
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

      io.sockets.emit('SetInsurancePolicy', JSON.stringify(logs.args) );

    } else {

    }
    event_listener.stopWatching();
  });

  var txHash = ContractObject[set_function](row_CPK, row_data, contract_address, {gas: 4141592});


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