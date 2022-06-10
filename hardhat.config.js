require("@nomiclabs/hardhat-waffle")

const ROPSTEN_PRIVATE_KEY = ""

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
