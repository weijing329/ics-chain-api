var MedicalRecord = new EmbarkJS.Contract({abi: [{"constant":true,"inputs":[{"name":"row_CPK","type":"string"}],"name":"GetTableRowDataHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"GetRowCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"row_CPK","type":"string"}],"name":"HasRow","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"row_CPK","type":"string"},{"name":"row_data","type":"string"},{"name":"hospital_days","type":"uint256"},{"name":"fee","type":"uint256"}],"name":"SetMedicalRecord","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"row_CPK","type":"string"}],"name":"Get_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"row_CPK","type":"string"},{"name":"row_data_hash","type":"bytes32"}],"name":"GetTableRowData","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"GetRowKey","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"row_CPK","type":"string"}],"name":"Get_hospital_days","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"row_CPK_hash","type":"bytes32"},{"indexed":false,"name":"row_CPK","type":"string"},{"indexed":false,"name":"row_data_hash","type":"bytes32"}],"name":"e_SetTableRowData","type":"event"}], address: '0x2e72f56ed24b8fd3a49c827f898fce0af40f36df', code: '606060405234610000575b610bb7806100186000396000f36060604052361561006c5760e060020a60003504631dcdb36b811461007157806331976b83146100d657806373492c77146100f55780638df0f4341461015c578063c5a0bf04146101f5578063ca745f6c1461025a578063d115c0f51461031d578063f644dcdd1461039b575b610000565b34610000576100c4600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061040095505050505050565b60408051918252519081900360200190f35b34610000576100c4610446565b60408051918252519081900360200190f35b3461000057610148600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061044d95505050505050565b604080519115158252519081900360200190f35b34610000576101f3600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b01803591820183900483028401830190945280835297999881019791965091820194509250829150840183828082843750949650508435946020013593506104ec92505050565b005b34610000576100c4600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061056895505050505050565b60408051918252519081900360200190f35b34610000576102af600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050933593506105b192505050565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561030f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34610000576102af60043561069a565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561030f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34610000576100c4600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061075595505050505050565b60408051918252519081900360200190f35b6000600182604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390205490505b919050565b6000545b90565b6000600160405180807f454d5054595f4d415050494e4700000000000000000000000000000000000000815260200150600d01905090815260200160405180910390205460001916600183604051808280519060200190808383829060006004602084601f0104600302600f01f1509050019150509081526020016040518091039020546000191614156104e357506000610441565b5060015b919050565b6104f6848461079e565b60406040519081016040528083815260200182815260200150600385604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050908152602001604051809103902060008201518160000155602082015181600101559050505b50505050565b6000600382604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390206001015490505b919050565b6020604051908101604052806000815260200150600283604051808280519060200190808383829060006004602084601f0104600302600f01f15091909101938452505060408051602093819003840181206000878152908552829020805460026000196001831615610100020190911604601f8101869004860283018601909352828252909390925083018282801561068c5780601f106106615761010080835404028352916020019161068c565b820191906000526020600020905b81548152906001019060200180831161066f57829003601f168201915b505050505090505b92915050565b604080516020810190915260008082528054839081101561000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156107485780601f1061071d57610100808354040283529160200191610748565b820191906000526020600020905b81548152906001019060200180831161072b57829003601f168201915b505050505090505b919050565b6000600382604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390206000015490505b919050565b60006000600160405180807f454d5054595f4d415050494e4700000000000000000000000000000000000000815260200150600d01905090815260200160405180910390205460001916600185604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390205460001916141561097c57600080548060010182818154818355818115116108c9576000838152602090206108c99181019083015b808211156108b657600081805460018160011615610100020316600290046000825580601f1061088857506108ba565b601f0160209004906000526020600020908101906108ba91905b808211156108b657600081556001016108a2565b5090565b5b5050600101610858565b5090565b5b505050916000526020600020900160005b8690919091509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061092a57805160ff1916838001178555610957565b82800160010185558215610957579182015b8281111561095757825182559160200191906001019061093c565b5b506109789291505b808211156108b657600081556001016108a2565b5090565b5050505b83604051808280519060200190808383829060006004602084601f0104600302600f01f1509050019150506040518091039020915082604051808280519060200190808383829060006004602084601f0104600302600f01f1509050019150506040518091039020905080600185604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390208190555082600285604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390206000836000191681526020019081526020016000209080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ac057805160ff1916838001178555610aed565b82800160010185558215610aed579182015b82811115610aed578251825591602001919060010190610ad2565b5b50610b0e9291505b808211156108b657600081556001016108a2565b5090565b505081600019167fd9f02c30c28847ad32227f87d689d20e7513512d6926033521890a7c9f06b5dc85836040518080602001836000191681526020018281038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610ba25780820380516001836020036101000a031916815260200191505b50935050505060405180910390a25b5050505056', gasEstimates: {"creation":[624,599800],"external":{"GetRowCount()":259,"GetRowKey(uint256)":null,"GetTableRowData(string,bytes32)":null,"GetTableRowDataHash(string)":null,"Get_fee(string)":null,"Get_hospital_days(string)":null,"HasRow(string)":null,"SetMedicalRecord(string,string,uint256,uint256)":null},"internal":{}}});

module.exports = MedicalRecord;