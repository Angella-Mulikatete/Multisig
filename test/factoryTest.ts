import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("MultiSigFactory", function(){

  async function deployMultisig(){
    const MultiSig =  await hre.ethers.getContractFactory("MultiSig");
    const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();
    const quorum =2;
    const validSigners = [owner, addr1, addr2, addr3] ;

    const multisig = await MultiSig.deploy(quorum, validSigners);

    return {multisig, owner, addr1, addr2, addr3}
  }

  async function deployFactory(){
    const quorum = 2;
    const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();
    const validSigners = [owner, addr1, addr2, addr3];
    const MultiSigFactory = await hre.ethers.getContractFactory("MultiSigFactory");
    const factory = await MultiSigFactory.deploy();



    return {factory}
  }

  describe("Cloning", function () {
    it("should create the multiSig clones", async function(){
      const {factory } = await loadFixture(deployFactory);
      const { owner, addr1, addr2, addr3 } = await loadFixture(deployMultisig);

      const quorum = 2;
      const validSigners = [owner, addr1, addr2, addr3]

      factory.createMultiSig(quorum, validSigners);
      factory.createMultiSig(quorum, validSigners);
      factory.createMultiSig(quorum, validSigners);

      const clones = factory.getMultiSigClones
      console.log(clones);

      await expect(clones).to.not.reverted;
    });
  });
});