// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "contracts/ERC20_token.sol";

contract ERC20 is IERC20 {

    event Transfer(address indexed from,address indexed to,uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    string public name;
    string public symbol;
    uint8 public decimals;

constructor(string memory _name, string memory _symbol,uint8 _decimals){
        name = _name;
        symbol = _symbol;
        decimals = _decimals;


}

uint256 public totalSupply;
//Instead of storing a list of all addresses and their balances, we use a mapping, allowing instant balance retrieval.
mapping(address=>uint256) public balanceOf;
// allowance mapping stores how many tokens a spender is allowed to spend on behalf of an owner.
//first mapping is the owner
mapping(address => mapping(address => uint256)) public allowance;

function transfer(address recepient,uint256 amount)  external returns (bool){
balanceOf[msg.sender]-=amount;
emit Transfer(msg.sender, recepient, amount);
return true;

}

// approve function gives permission to another address (the spender) to use some of your token

//approvals return boolean cases
//You tell your bank (smart contract) to allow Netflix (spender) to withdraw $10/month from your account (msg.sender).
function approve(address spender, uint256 amount) external returns (bool){
allowance[msg.sender][spender]=amount;
emit Approval(msg.sender, spender, amount);
return true;
}
function transferFrom(address sender, address recipient, uint256 amount)external returns (bool){
     allowance[sender][msg.sender] -= amount;
    balanceOf[recipient]+=amount;
    balanceOf[sender]-=amount;
    emit Transfer(sender,recipient,amount);
    return true;

}
   //The ERC-20 standard treats burning like a transfer to the "zero address" (0x0000000000000000000000000000000000000000).
//This makes it visible on blockchain explorers that tokens were burned.
function _burn(address from,uint256 amount)internal{
    balanceOf[from]-=amount;
    totalSupply-=amount;
    emit Transfer(address(0), from, amount);
}

//_mint function creates (mints) new tokens and adds them to an address.
// totalSupply can increase in an ERC-20 token if the contract allows minting.
//When a staking system rewards users with new tokens, it mints those rewards by increasing totalSupply.
function _mint(address to,uint256 amount)internal {
balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);


}
//ERC-20 requires a Transfer event for every balance change.
}

/*
If you mint tokens, Etherscan will show:

scss
Copy code
0x0000000000000000000000000000000000000000 → Alice (100 tokens)
This means 100 new tokens were created and sent to Alice.



allowance[Alice][Bob] = 30;
Bob can now spend up to 30 tokens from Alice's balance by calling transferFrom.

Alice calls approve(Bob, 30)
*/