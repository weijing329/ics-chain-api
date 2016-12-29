var Web3 = require('web3');

var web3 = global.web3;
if (typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
  web3 = new Web3(global.web3.currentProvider);
} else if (typeof Web3 !== 'undefined') {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

module.exports = web3;