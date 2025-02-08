// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "contracts/ERC20.sol";

contract MyToken is ERC20 {
constructor(string memory name,string memory symbol,uint8 decimals)
//1 Bitcoin = 100,000,000 satoshis (8 decimal places)
ERC20(name,symbol,decimals){
    //decimals variable in an ERC-20 token defines how many decimal places a token has
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10 ** uint256(decimals));

//decimal-dealig with smallest unit jst like the cent
}
}
//The 100 represents the number of whole tokens you want to mint. But since ERC-20 tokens use smallest units (just like cents for dollars), we multiply by 10^decimals to account for it.