// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Unchecked{
    //external and public are visibilty modifiers
    //function(<data type> name)
function check(uint256 x,uint256 y) public pure returns(uint256){
//return (x+y);  // 22291 gas
unchecked{return (x+y);}
//saves gas because it omits safety checks
//use unchecked to overcome  // 22103 gas
}


}