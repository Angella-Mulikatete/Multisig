//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;

import './IMultisig.sol';

contract Multisig is IMultisigCore{

    uint8 internal minApprovals;// the minimum required approvals to execute any transactions
    uint256 public availableBalances; //the balance of the Multisig available to spend in transactions
    uint256 public nounce;

    struct Transaction{
        address to;
        uint256 value;
        bytes data;
        bool isExecuted;
    }

    address [] public owners;
    mapping (address => bool) public isAdmin;
    mapping(uint256 => mapping(address => bool)) public isApprover;
    Transaction [] transactions;

    modifier onlyAdmin(){
        if(!isAdmin[msg.sender]){
            revert NotAdmin(msg.sender);
        }
        _;
    }

    modifier notExecute(uint256 txid){
        if(transactions[txid].isExecuted){
            revert AlreadyExecuted(txid);
        }
        _;
    }

    modifier notApproved(uint256 txnid){
        if(!isApprover[txnid][msg.sender]){
            revert NotApprovedYet(txnid, msg.sender);
        }
        _;
    }

}