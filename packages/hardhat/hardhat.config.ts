require('dotenv').config()

require('@openzeppelin/hardhat-upgrades')
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-waffle')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-contract-sizer')
require('hardhat-abi-exporter')
require('hardhat-log-remover')
require('@openzeppelin/hardhat-upgrades')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const PRIVATE_KEY = "";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
      accounts: {
        mnemonic: process.env.SEED !== undefined ? process.env.SEED : '',
      },
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sepolia:{
      url: '' ,
      accounts:[`${PRIVATE_KEY}`],      
    },
    chiado:{
      url: 'https://rpc.chiado.gnosis.gateway.fm/' ,
      accounts:[`${PRIVATE_KEY}`],      
    },
    goerli:{
      url: '' ,
      accounts:[`${PRIVATE_KEY}`],      
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: '',
      accounts: [`${PRIVATE_KEY}`],
    },
    polygon: {
      url: '' ,
      accounts:[`${PRIVATE_KEY}`],
    },
    polygonMumbai: {
      url: '',
      accounts: [`${PRIVATE_KEY}`],
    },
    mainnet: {
      url: process.env.MAINNET_URL || '',
      accounts: [`${PRIVATE_KEY}`],
    },
    arbitrumGoerli: {
      url: '' ,
      accounts:[`${PRIVATE_KEY}`],
    },
    polygonZk: {
      url: 'https://rpc.public.zkevm-test.net' ,
      accounts:[`${PRIVATE_KEY}`],
    },
    lineaTest: {
      url: '' ,
      accounts:[`${PRIVATE_KEY}`],
    },
    mantleTest: {
      url: 'https://rpc.testnet.mantle.xyz/' ,
      accounts:[`${PRIVATE_KEY}`],
    },
    scrollTest: {
      url: 'https://sepolia-rpc.scroll.io/' ,
      accounts:[`${PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
    gasPrice: 200,
    showTimeSpent: true,
    coinmarketcap: process.env.COINMARKETCAP_API,
    // outputFile: './gasReporter',
    // noColors: true,
  },
  etherscan: {
    apiKey: {
      bscTestnet: '',
      mainnet: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: '',
      polygon: '',
      sepolia: '',
      goerli: '',
      arbitrumGoerli: '',
      polygonZk: '',
      lineaTest:'',
      scrollTest:'',
    },
    customChains: [
      {
        network: "polygonZk",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com"
        }
      },
      {
        network: "lineaTest",
        chainId: 59140,
        urls: {
          apiURL: "https://api-testnet.lineascan.build/api",
          browserURL: "https://goerli.lineascan.build"
        }
      },
      {
        network: "scrollTest",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com"
        }
      }
    ]
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  abiExporter: [
    {
      path: './abi/',
      clear: true,
      flat: true,
      only: ['buddyGuard'],
      spacing: 2,
      pretty: true,
    },
    {
      path: './abi/ugly',
      only: ['buddyGuard'],
      clear: true,
      flat: true,
      pretty: false,
    },
  ],
}
