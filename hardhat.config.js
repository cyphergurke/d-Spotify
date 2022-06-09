require("@nomiclabs/hardhat-waffle")

const ROPSTEN_PRIVATE_KEY = "69ce0dff2a9cec93a254c36ce08144e13d8fce62f01e10ca55187049c3cd3956"

module.exports = {

  //defaultNetwork: "hardhat",

  //solidity: "0.8.4",

  //networks: {
  //hardhat: {
  //  chainId: 1337
  // },
  //  unused configuration commented out for now

  //  defaultNetwork: "hardhat",
  //  networks: {
  //    hardhat: {
  //      chainId: 1337
  //    },
  //  unused configuration commented out for now
  //  mumbai: {
  //    url: "https://rpc-mumbai.maticvigil.com",
  //    accounts: [process.env.privateKey]
  //  }
  //  },
  solidity: "0.8.4",

  networks: {
    //hardhat: {
    //  chainId: 1337
    // },
    //  unused configuration commented out for now
    ropsten: {
      url: "https://ropsten.infura.io/v3/832c452c39884c6fa18237bea47bab04",
      accounts: [process.env.privateKey] //[process.env.privateKey] `${ROPSTEN_PRIVATE_KEY}`
    }
  }
}