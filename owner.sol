// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract owner_case{
    
address payable public owner;
//payable- can receive ether.
constructor(){
owner=payable(msg.sender);
}

enum Vacancy{
    occupied, 
    full
}

Vacancy current_vacancy ;

//require(current_vacancy==Vacancy.full,"nope");

}