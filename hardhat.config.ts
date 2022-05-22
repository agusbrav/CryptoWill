import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";
import "./tasks/accounts";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.14",
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [`0x${process.env.PRIVATE_KEY}`]
          : [],
      gasPrice: 8000000000,
    },
    hardhat: {
      chainId: 31337,
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [`0x${process.env.PRIVATE_KEY}`]
          : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

export default config;
