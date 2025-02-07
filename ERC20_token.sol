// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//erc20 tokens - transfer tokens, allow others to transfer tokens on behalf of the token holder

interface IERC20 {//external functions can only be declared internally and externally
//extternal functions can only be declared externally
//so you cant use public and external
function totalSupply() external view returns (uint256);
function balanceOf(address amount) external view returns (uint256);
function transfer(address recepient,uint256 amount)  external returns (bool);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount)external returns (bool);
}

