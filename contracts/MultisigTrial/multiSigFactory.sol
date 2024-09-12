//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;
// pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import './MultiSig.sol';

contract MultiSigFactory {

    MultiSig[] public multisigClones;

    function createMultiSig(uint8 _quorum, address[] memory _validSigners) external  returns(MultiSig newMultiSig_, uint length_){
        newMultiSig_ = new MultiSig(_quorum,_validSigners );
        multisigClones.push(newMultiSig_);

        length_ = multisigClones.length;
    }

    function getMultiSigClones() public view returns (MultiSig[] memory){
        return multisigClones;
    }
}

//MultiSigFactoryModule#MultiSigFactory Address - 0x5FbDB2315678afecb367f032d93F642f64180aa3