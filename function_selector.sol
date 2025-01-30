^// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
contract Function_selector{
function transfer(address to,uint256 amount) pure returns (string memory){
    return "transfer function callled";
}

function getSelector() pure returns (bytes4){
    returns bytes4 (keccak256("transfer(address,uint256)"));
}
}