// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract A {
//virtual function is one going to be overriden
function inher() public pure virtual returns (string memory){
    //memory-strings , struct, array --- without it solidity wouldnt know where to store string 
   //Strings in Solidity are dynamic types, meaning their size can change, unlike fixed-size types like uint or bool.
   //Solidity requires you to specify a data location (memory, storage, or calldata) for all dynamic types
    return "A";
}
}
contract B is A{
    //override is for function being overriden from parent
    function  inher() public pure override returns (string memory){
        return "B";
    }

}