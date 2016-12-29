var Person = new EmbarkJS.Contract({abi: [{"constant":true,"inputs":[{"name":"person_code","type":"string"}],"name":"GetPerson","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"person_code","type":"string"},{"name":"person_hash","type":"bytes32"}],"name":"SetPerson","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"person_code_hash","type":"bytes32"},{"indexed":false,"name":"person_hash","type":"bytes32"}],"name":"e_SetPerson","type":"event"}], address: '0x95da97535ea675ec896005f525dd8cf54853172d', code: '606060405234610000575b6101d8806100186000396000f3606060405260e060020a60003504631b12c63a8114610029578063f247baf91461008e575b610000565b346100005761007c600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496506100e595505050505050565b60408051918252519081900360200190f35b34610000576100e3600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650509335935061012b92505050565b005b6000600082604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390205490505b919050565b80600083604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505090815260200160405180910390208190555081604051808280519060200190808383829060006004602084601f0104600302600f01f1506040805193909101839003832086845290519094507fd6ed2bad2c8f364683bad2e06c18a5496a1be0bb8350ab876a0353356bd72bc3935091829003602001919050a25b505056', gasEstimates: {"creation":[133,94400],"external":{"GetPerson(string)":null,"SetPerson(string,bytes32)":null},"internal":{}}});

module.exports = Person;