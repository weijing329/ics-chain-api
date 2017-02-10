'use strict';

var util = require('util');

module.exports = {
  GetClaimRecordInfo: GetClaimRecordInfo,
  GetClaimRecordHashWithStatusCode: GetClaimRecordHashWithStatusCode,
  GetClaimRecord: GetClaimRecord,
  SetClaimRecord: SetClaimRecord,
  CalculateBenefit: CalculateBenefit
};

function GetClaimRecordInfo(req, res) {
  var ContractObject = ClaimRecord._originalContractObject;

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

function GetClaimRecordHashWithStatusCode(req, res) {
  var row_CPK = req.swagger.params.row_CPK.value || '';

  var ContractObject = ClaimRecord._originalContractObject;

  // TODO 看是不是先讀取queue內是否有相同contract的寫入時間，以queue內的資料當作是最新的。
  var row_data_hash = ContractObject.GetTableRowDataHash(row_CPK);
  var row_status_code = ContractObject.Get_status_code(row_CPK).toNumber();

  var TableRowDataHashWithStatusCode = {
    row_CPK: row_CPK,
    row_data_hash: row_data_hash,
    status_code: row_status_code
  };

  res.json(TableRowDataHashWithStatusCode);
}

function GetClaimRecord(req, res) {
  var row_CPK = req.swagger.params.row_CPK.value || '';
  var row_data_hash = req.swagger.params.hash.value || '';

  var ContractObject = ClaimRecord._originalContractObject;

  var row_data = ContractObject.GetTableRowData(row_CPK, row_data_hash);

  var TableRowData = {
    row_CPK: row_CPK,
    row_data_hash: row_data_hash,
    row_data: row_data
  };

  var insured_person_ID = ContractObject.Get_insured_person_ID(row_CPK);
  var medical_record_ID = ContractObject.Get_medical_record_ID(row_CPK);
  var eligible_benefit_amount = ContractObject.Get_eligible_benefit_amount(row_CPK).toNumber();
  var status_code = ContractObject.Get_status_code(row_CPK).toNumber();

  var ClaimRecordResponse = {
    table_row: TableRowData,
    insured_person_ID: insured_person_ID,
    medical_record_ID: medical_record_ID,
    eligible_benefit_amount: eligible_benefit_amount,
    status_code: status_code
  };

  res.json(ClaimRecordResponse);
}

function SetClaimRecord(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var claim_record = req.swagger.params.claim_record.value;
  var insured_person_ID = req.swagger.params.claim_record.value.insured_person_ID;
  var medical_record_ID = req.swagger.params.claim_record.value.medical_record_ID;
  var eligible_benefit_amount = req.swagger.params.claim_record.value.eligible_benefit_amount;
  var status_code = req.swagger.params.claim_record.value.status_code;

  var row_CPK = claim_record.table_row.row_CPK || '';
  var row_data = claim_record.table_row.row_data || '';

  var ContractObject = ClaimRecord._originalContractObject;
  var set_function = 'SetClaimRecord';
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

      io.sockets.emit('SetClaimRecord', JSON.stringify(logs.args) );

    } else {

    }
    event_listener.stopWatching();
  });

  var txHash = ContractObject[set_function](row_CPK, row_data, insured_person_ID, medical_record_ID, eligible_benefit_amount, status_code, {gas: 4141592});


  // var pending_date = moment();
  // var diff_microseconds = pending_date.diff(start_date);
  //addToLog('time span: ' + diff_microseconds + ' ms');

  //var web3_Transaction = web3.eth.getTransaction(txHash);

  var TransactionResponse = {
    txHash: txHash
  };
  res.json(TransactionResponse);

}

function CalculateBenefit(req, res) {
  var calculate_benefit_param = req.swagger.params.calculate_benefit_param.value;
  var cliam_record_ID = calculate_benefit_param.cliam_record_ID;
  var insurance_policy_package_ID = calculate_benefit_param.insurance_policy_package_ID;
  var insurance_policy_ID = calculate_benefit_param.insurance_policy_ID;
  var benefit_item_ID = calculate_benefit_param.benefit_item_ID;

  var ContractObject = ClaimRecord._originalContractObject;
  var function_name = 'CalculateBenefit';

  var txHash = ContractObject[function_name](cliam_record_ID, insurance_policy_package_ID, insurance_policy_ID, benefit_item_ID, {gas: 4141592});

  var TransactionResponse = {
    txHash: txHash
  };
  res.json(TransactionResponse);
}

function NotImplemented(req, res) {
  res.json('Not implemented');
}