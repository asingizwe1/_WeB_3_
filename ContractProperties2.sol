// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//you cant add visibility to a function without any contract
//destructuring 
function destructure()  pure returns (uint256,bool,uint256,uint256,uint256){
(uint256 i,bool o,uint256 p)=(1,true,3);
(uint256 x, uint256 y)=(4,5);
return (i,o,p,x,y);
}
 //passing array to function
 function AI(uint256[] memory arr) {
//
 }

//function to return and array
function RA() returns (uint256 [] memory){
    //
}

//errors
//they will undo all changes made to the state of transaction
//use revert, assert or require
function errorE() pure {
    uint x;
    // for require
    require(x>9,"valid");

//for revert-used to return when condition is valid
if (x>9){
    revert("valid");
}
}



