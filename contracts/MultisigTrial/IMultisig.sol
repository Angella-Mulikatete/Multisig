//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;

interface IMultisigCore {
    event Deposit(address indexed sender, uint indexed value, bytes data);
    event Submit(uint256 indexed txId, address indexed admin);
    event Approve(uint256 indexed txId, address indexed admin);
    event Revoke(uint256 indexed txId, address indexed admin);
    event Execute(uint256 indexed txId, bool indexed success, bytes indexed data);

    //errors
    error InvalidTxnValue(); //thrown when txn value is invalid
    error InvalidMinApproval(); // thrown if minApproval > admins.length
    error NotAdmin(address caller); // thrown when the caller of function is not an admin
    error AlreadyExecuted(uint256 txId); // thrown when txn is already executed
    error AlreadyApproved(uint256 txId, address admin); // thrown when txn is already approved
    error NotApprovedYet(uint256 txId, address admin); // thrown when the txn is not approved yet
    error NotEnoughApprovals(uint256 txId); // thrown if the txn doesnot have enough approvals
}