//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;
// pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './Bank.sol';

contract BankFactory{
   Bank bank;
   Bank[] public listOfBanks;

   function createBanks(address _owner, uint256 _funds) external {
        bank = new Bank(_owner, _funds);
        listOfBanks.push(bank);
   }

    function getBankClones() public view returns (Bank[] memory){
        return listOfBanks;
    }
}