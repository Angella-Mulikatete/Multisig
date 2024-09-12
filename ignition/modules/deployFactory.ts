const hre = require("hardhat");

async function main(){
    const Factory = await hre.ethers.getContractFactory("MultiSigFactory");
    const factory = await Factory.deploy();
    await factory.deployed();
}