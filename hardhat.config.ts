import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/QVY2UstBJhd7ELG4N6yM2GNbve_RT-0Y",
    },
   
    },
    
};

export default config;
