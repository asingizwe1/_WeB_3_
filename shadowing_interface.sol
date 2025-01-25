// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//interface
//abstract methods, declared functions must be external,CAN'T declare state variables
interface X{
    function m() external returns (string memory);
}

contract A is X{
    //interface function
    function m() external returns (string memory) {
return "louis is clutch";
}
string public name = "A";
}

contract B is A{
//to shadow the inherited state of name we use constructor 
//else it wont compile
constructor(){
    super;//used to call all immediate parent contracts
    name= "B";
}

}