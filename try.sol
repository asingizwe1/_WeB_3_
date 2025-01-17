// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract Bank {
    mapping(address => uint256) public balances;

    // Deposit Ether into the contract
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        //"Take the current balance of the caller (msg.sender) in the balances mapping, and add the Ether they just sent (msg.value) to it."
    }

    // Withdraw Ether from the contract
    function withdraw(uint256 amount) public {
        require(amount <= balances[msg.sender], "Insufficient funds");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
