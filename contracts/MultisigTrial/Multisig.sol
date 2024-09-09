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

    address [] public admins;
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

    constructor(address[] memory _admins, uint8 _minApprovals){
        admins = _admins;

        if(_minApprovals > admins.length){
           revert InvalidMinApproval();
        }
         minApprovals = _minApprovals;

        for(uint8 i ; i < _admins.length; i++){
            isAdmin[admins[i]] = true;
        }
    }

    function submit(address _to, uint256 _value, bytes calldata _data) internal returns (uint256 txId){
        if(_value > availableBalances){
            revert InvalidTxnValue();
        }

        Transaction memory txn = Transaction({
            to: _to,
            value: _value,
            data: _data,
            isExecuted: false
        });
        transactions.push(txn);
        availableBalances -= _value;
        txId = transactions.length - 1;

        emit Submit(txId, msg.sender);
        return txId;
    }

}