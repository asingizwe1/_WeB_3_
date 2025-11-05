// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract Assembly{

function yel_let() public pure returns (uint256 z ){

assembly{
let x:=256

z:=789

}


}

}
contract AssemblyIf{
function isSmall(uint x) public pure returns (uint result){
assembly{
if lt(x,5) {result:=1}//is x<5 , result =1

}

}

function swiitch(uint256 x) public pure returns (uint256 result)
{
assembly{
switch x
case 1{result:=11}
case 2{result:=21}
default {result:=31}


}


}

}