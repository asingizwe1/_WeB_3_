//SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;
contract CallAnything{
address public s_someAddress;
uint256 public s_amount;

function transfer(address someAddress,uint256 amount) public{
s_someAddress=someAddress;
s_amount=amount;

}//gives hex of fucntion selector

//function to get selector
function getSelector() public pure returns(bytes4 selector){
selector=bytes4(keccak256(bytes("transfer(address,uint256)")));

}

//encode our  parameters with the function selector
function getDataToCallTransfer(address someAddress,uint256 amount) public pure returns (bytes memory){

return abi.encodeWithSelector(getSelector() , someAddress,amount);

}


function callTransfrerFunctionDirectly(address someAddress,uint256 amount) public returns (bytes4,bool){
//helps us call the transfer function but passing in those parameters
(bool success,bytes memory returnData)=address(this).call(abi.encodeWithSelector(getSelector(),someAddress,amount));
//returnData->whatever the call returns 
return(bytes4(returnData),success);
} 

function callTransfrerFunctionDirectlySig(address someAddress,uint256 amount) public returns (bytes4,bool){
//helps us call the transfer function but passing in those parameters
(bool success,bytes memory returnData)=address(this).call(abi.encodeWithSignature("transfer(address,uint256)",someAddress,amount));
//returnData->whatever the call returns 
return(bytes4(returnData),success);
} 
//function selector getting methods
 

}