// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract Property {
   enum Status{occupied,vacant}
   //you need to declare status is of which type before using it
Status public current_stat;

constructor() {
    owner = msg.sender;
    current_stat = Status.vacant;
    //asignment is done using "=" only
}

 //use modifiers to hold extra code which would have been held in a function
 modifier OnlyVacant {
    //require means statements below only execute if this is right
    require(Currentstat==Status.vacant);
 } 

modifier Cost(uint _amount){
//requier requires 2 parameter, the consition and output if false
require(msg.value > _amount,"suficient");

}
//in lay man an event cant be like constructor in java used to initialise
event hodl(address _sender, uint _value);
//you can pass modifier in function definition
function bookRoom() public OnlyVacant ,Cost(70) {
    emit hodl(msg.sender,msg.value);
owner.transfer(msg.value);//msg.value- amount of ether
}




}