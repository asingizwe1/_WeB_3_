// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
event person(address _owner,string _message);


contract ev{constructor(){
emit person(msg.sender,"iop");
}

}