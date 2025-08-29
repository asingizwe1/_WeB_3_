// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract UPToken is ERC20Votes {
    constructor()
        ERC20("Unlock Protocol", "UP")
        ERC20Permit("Unlock Protocol") // required for delegateBySig
    {
        // mint initial supply if needed
        _mint(msg.sender, 1_000_000 ether);
    }

    // Delegation comes from ERC20Votes
    // -------------------------------
    // delegate(address delegatee)
    // delegateBySig(address delegatee, uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s)
    // getVotes(address account)
    // getPastVotes(address account, uint blockNumber)
    // getPastTotalSupply(uint blockNumber)
}
