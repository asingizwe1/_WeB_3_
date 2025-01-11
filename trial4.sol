// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract N{
struct Trader{
string Pair;
uint Lotsize;
}

Trader public Louis;
// you cant use view because you are modiying state as shown below
function setDetails(string memory _pair, uint  _lot) public  {
Louis.Pair=_pair;
Louis.Lotsize=_lot;
}

}