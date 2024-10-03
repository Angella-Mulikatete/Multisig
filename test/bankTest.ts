import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("BankFactory", function(){
    async function deployBank(){
        const bankContract = await ethers.getContractFactory("Bank")

        const funds = ethers.parseUnits("1000");
        const [owner] = await ethers.getSigners();

        const bank = await bankContract.deploy(owner, funds);

        return {bank, owner, funds}
    }

    async function deployBankFactory(){
        const factoryContract = await ethers.getContractFactory("BankFactory");
        const [owner] = await ethers.getSigners();

        const factory = await factoryContract.deploy();
        return {factory, owner}
    }

    describe("cloning", function(){
        it("should create instances of bank", async function (){
            const {factory} = await loadFixture(deployBankFactory);
            const {owner, funds} = await loadFixture(deployBank);

            const bnk1 = await factory.createBanks(owner, funds);
            const bnk2 = await factory.createBanks(owner, funds);
            const bnk3 = await factory.createBanks(owner, funds);
            const bnk4 = await factory.createBanks(owner, funds);

            const clones = factory.getBankClones;
            console.log(clones);

            await expect(clones).to.not.reverted;   
       });
    });
});