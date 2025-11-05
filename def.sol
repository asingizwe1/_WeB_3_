
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Norm{

uint256 public constant NAME =56;
uint256 public immutable x;

uint256 public setter;
uint256 public getter;
function set(uint256 _setter) public {
setter=_setter;
}

//can read state without sending a transaction
function get() public view returns(uint256){
return getter;
}

}