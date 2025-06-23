// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
//format is got from the ethereum standard
contract ManualToken {
    //mapping that maps people's balances to there addresses
    //someone's balance is just a mapping in the token contract
    mapping(address => uint256) s_balances;

    //function name() public pure returns (string memory) {
     //   return "ManualToken";
   // }
   //you could just assign a name
string public name = "Manual Token";

    function totalSupply() public pure returns (uint256) {
        return 100 ether;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }
    function balanceOf(address account) public pure returns (uint256) {
        return s_balances[_owner];
    }

    function transfer(address to, uint256 amount) public  {
        uint256 previousBalance=balanceOf(msg.sender)+balanceOf(_to);
       s_balances[msg.sender]-= amount;
        s_balances[_to]+= amount;
        require(balanceOf(msg.sender)+balanceOf(_to) == previousBalances);
    }
}
