// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract trail3{
//immutable variable cant be changed
address public immutable SendAdd;



constructor()   {
    SendAdd=msg.sender;
}

}