// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Storage{
function calldat(string calldata _age) external {

}

uint16 [] public arr;
//dat-type-visiblity-name
mapping (uint16 => address) map;

struct myStruct {uint16 foo;}
//must create object of struct
myStruct public  mi;

mapping (uint16=> myStruct) myS;

function f() public {
}

function setStruct(uint16 _foo) public {
//we use object here of struct to set the struct
    mi.foo = _foo;
} 

}