// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/*
Let users burn tokens in exchange for:

Airtime

Gift cards

USDT (manually or from treasury)
 */
 /*Setup: You deploy another contract, again passing the PlasticPenny address.

Flow:

A user who has earned PPEN calls PlasticPenny.approve(redemptionManager, amount).

They then call requestRedeem(amount).

This does transferFrom(user → redemptionManager, amount) (i.e. burns or locks their PPEN in the contract).

Emits RedeemRequested(user, amount).

Your backend watches for RedeemRequested events. When it sees one, it knows “Alice wants to redeem 500 PPEN.”

Off-chain, you then send Alice her airtime, gift card, or USDT from your treasury.
  */
function redeemForCash(address user, uint tokenAmount) external {
    require(token.balanceOf(user) >= tokenAmount, "Insufficient balance");
    token.transferFrom(user, address(this), tokenAmount);

    // Manually process cashout from backend
    emit RedeemRequest(user, tokenAmount);
}
pragma solidity ^0.8.19;

interface IERC20Burnable {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract RedemptionManager is Ownable {
    IERC20Burnable public token;

    event RedeemRequested(address indexed user, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20Burnable(_tokenAddress);
    }

    function requestRedeem(uint256 amount) external {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient PPEN");
        token.transferFrom(msg.sender, address(this), amount);
        emit RedeemRequested(msg.sender, amount);
    }

    function adminWithdraw(address to, uint256 amount) external onlyOwner {
        token.transferFrom(address(this), to, amount);
    }
}
