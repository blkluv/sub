export const getTypedData = (network, data) => {
  const networks =  {
    "ETH - Mainnet": 1, 
    "ETH - Ropsten": 3, 
    "ETH - Rinkeby": 4, 
    "Polygon - Mainnet": 137, 
    "Polygon - Mumbai": 80001
  }
  const domain = {
    name: "ProveOwnership",
    version: "1.0",
    chainId: networks[network]
  }
  const types = {
    ProveOwnership: [       
      { name: "allow", type: "address" }
    ]
  }
  const proveOwnership = data

  return { domain, types, proveOwnership };
}

export const signTypedData = async (address, network) => {  
  const from = "";
  const msgParams = getTypedData(network, nonce);
  var params = [from, msgParams];
  var method = 'eth_signTypedData_v4';
}