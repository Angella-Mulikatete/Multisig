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
});