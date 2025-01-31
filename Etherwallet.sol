// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

//basic wallet -anyone can send ETH
//only the owner can withdraw

contract BasicWallet {
    address payable public owner; //address of the owner

    constructor() payable { //payable keyword means that you have to give 50$ to contract when you deploy it
        //the creator will be the owner of the contract at the time of deployment
        owner = payable(msg.sender);//msg - message, sender - who is sending this message
    }

receive() external payable { }

    function withdraw(uint256 _amount) external {
        require(msg.sender == owner,"caller is not the owner");
        //either the one who deployed the contract is the owner or it throws an error
        payable(msg.sender).transfer(_amount);}

//view since it doesnt modify state
        function getBalance() external view returns (uint256){
            return address(this).balance;
        }}
//address(this)-This represents the address of the current contract.
//In Solidity, every contract is associated with an Ethereum address, and address(this) gives you that address.
//address(this).balance fetches the balance of the contract itself.