//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract CallAnything{
address public s_someAddress;
uint256 public s_amount;

//function signature for function below   
 function transfer(address someAddress,uint256 amount) public{
s_amount=amount;
s_someAddress=someAddress;
 }

function getSelectorOne() public pure returns (bytes4 selector){
 selector = bytes4(keccak256(bytes("transfer(address,uint256)")));

}
//piblic pure -> t does not touch blockchain storage
// the function below is to encode the parameters with the function selctor
function getDataToCallTransfer(address someAddress,uint256 amount) public pure returns (bytes memory){

return abi.encodeWithSelector(getSelectorOne(),someAddress,amount);
//go use transfer function pass in parameters and get out
}


//this function will help us call the transfer function by passing in those parameters without having to do contract.transfer
//you can do this accross multiple contracts by changing the address of the contratc you're calling
function callTransferFunctionDirectly(address someAddress,uint256 amount) public returns(bytes4,bool){
//will return bool -> whether the call was successful or not and what is returned

(bool success,bytes memory returnData)=address(this).call(
    abi.encodeWithSelector(getSelectorOne(),someAddress,amount)
);
return(bytes4(returnData),success);

}

}
// this "0xa9059cbb" tells solidity that when you see it you are refering to the transfer function
