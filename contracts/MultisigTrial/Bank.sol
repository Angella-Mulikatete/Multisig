//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;
// pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Bank{
    uint256 public funds;
    address public owner;
    address public deployer;

    constructor(address _owner, uint256 _funds){
        owner = _owner;
        funds = _funds;
        deployer = msg.sender;
    }
}