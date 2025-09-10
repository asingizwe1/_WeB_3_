//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Encoding{
    //public pure because we arent going to be reading any storage
function combineStrings() public pure returns (string memory){
return string(abi.encodePacked("hi mum"," miss you"));
}
//abi.encodepacked- non standard way to encode staff
//since we arent reading state
function encodeNUmber() public pure returns (bytes memory){
bytes memory number =abi.encode(1);
return number;

}

function encodeString() public pure returns(bytes memory){
bytes memory someString = abi.encode('some string');
return someString;
//give many zeros in so we can remove them using abi.encodePacked
//encodePacked helps to save gas
}

//you can decode staff using abi.encode
function decodeString() public pure returns (string memory){
    //decode the result of encode string.. decode takes up parameter of value to decode and what to decode to
string memory someString = abi.decode(encodeString(),(string));//we are decoding the result of encodeString);
//we could say (string memory x,string memory y) = abi.decode (fn(),(string,string)) - > if we are decoding to separete strings - if you want to return seperate encoded string values
return someString;

}
//decoding works only on encode

}
//transactions - contract deployment
/*
Nonce tx: count for the account
Gas PRICE:price per unit of gas(in wei)
" LIMIT:max gas
to:empty
Value:amount of wei to send
Data:has the contract initialisation code and contract byte code
//how you initialise contract and how the contract looks like
v,r,s: - > but ethere does it for us in this case
*/
