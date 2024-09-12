import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Multisig", function () {
  
  // let Multisig, addr1, addr2,owner;
  async function deployToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const erc20Token = await hre.ethers.getContractFactory("MyToken");
    const token = await erc20Token.deploy();

    return { token };
  }

  async function deployMultisig() {
    
    
    // Contracts are deployed using the first signer/account by default
    const MultiSig = await hre.ethers.getContractFactory("MultiSig");

    const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();

    const quorum = 2;
    const validSigners = [owner, addr1, addr2, addr3];

    
    const multisig = await MultiSig.deploy(quorum,validSigners);
    //  await token.transfer(multisig.address, ethers.utils.parseUnits("1000", 18));

    return {multisig,owner, addr1, addr2,addr3}

  }

  describe("Deployment", function () {

    it( "should check if the quorum is greater than one", async function () {
      const { multisig } = await loadFixture(deployMultisig);

      expect(await multisig.quorum()).to.be.greaterThan(1);
    });

    it("should check the number of valid signers > 1", async function(){
      const { multisig } = await loadFixture(deployMultisig);

      const validSignersCount = await multisig.noOfValidSigners();
      expect(validSignersCount).to.be.greaterThan(1);

    });

    it("should check if quorum is greater than valid length", async() => {
      const { multisig } = await loadFixture(deployMultisig);

      const validSignersCount = await multisig.noOfValidSigners();

      expect(await multisig.quorum()).to.be.lessThanOrEqual(validSignersCount);
    });

  });

 
});
