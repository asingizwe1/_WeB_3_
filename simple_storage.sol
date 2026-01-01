// SPDX-License-Identifier: MIT    basically means anyone can use this code
pragma solidity ^0.8.19;

contract SimpleStorage{
//by default this is internal so you cant be able to see the state unless you set it to
//if you set it to public you will be able to see the variable when you transact
uint256 favoriteNumber;
//uint256 public favoriteNumber;
//public functions are visible externally and internally
//(creates a getter function for storage/state variables)->other people can call this because its has a getter  

/*
bool hasFavoriteNumber=true;
string favoriteNumberToText="eighty-eight";
//strings are bytes objects specifically for texts
//strings can easily be converted to bytes32 because they are basically to be the same thing
int256 favoriteInt=-88;
address myAddress=0x0038838324234234327941289481248212141242;
bytes32 favoriteBytes32="cat";//bytes are like 0x2aserfs ->representing a hex of something
*/

function store(uint256 _favoriteNumber) public{
favoriteNumber=_favoriteNumber;
//retrieve() -> when you call store this will cost gas because its calling another function which must read state
}
//you can only access a variable in scope its in

function retrieve() public view returns (uint256){
return favoriteNumber;
}

}
//deploying a contract using the same process as sending a transaction of eth
//input field notates all the machine readable code
