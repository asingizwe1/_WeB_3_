pragma solidity ^0.8.26;

contract MyContract{
    //we can use it as datatype
struct MyStruc {
uint256 Uintx;
string name;

}
MyStruc public MS = MyStruc(56,"louis");

uint[] public uintArray=[1,2,3,4,5];
uint[] public values= [23,4,6];

//value passed should be the same as type of array
function addValue(uint _value) public{

values.push(_value);
}

function valueCount() public view returns (uint){
//view- cant change state
    return uintArray.length ;
}



}