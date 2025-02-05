// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//low levl call of other contract
contract Receiver{
uint balanceReceived;
//function to receive ether
receive() external payable {
balanceReceived += msg.value;

 }

}
contract Sender{
function sendsEther(
    address payable _to
) public payable {//lowlevel call to send ether
//low-level calls are functions that interact with EVM without any abstraction
    //.call is used for sending Ether and executing arbitrary code at an address.
    // returns two values
//If the receiving contract needs more than 2300 gas use .call instead of .transfer and .send
    (bool success,)=_to.call{value:msg.value}("");//("") → Calls no specific function (empty data), just sends Ether.
   //{value: msg.value} → Sends msg.value (Ether) with the call.
    //Use .call when sending Ether to contracts that do not implement receive() or fallback().
    require(success,"call failed");
}//reciever contract accepts ether through the receive function
//sender contract uses call to send ether to the receiver contract

}