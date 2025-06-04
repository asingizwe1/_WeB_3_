//This contract only reads data
//(no transactions), so it's gas-free when called from the frontend using call or via Web3 (e.g., contract.balanceOfUser(...)).
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract BalanceViewer {
    address public tokenAddress;

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        tokenAddress = _tokenAddress;
    }

    /// @notice Get PPEN and ETH balance of a user
    function getUserBalances(
        address user
    ) external view returns (uint256 ppenBalance, uint256 ethBalance) {
        ppenBalance = IERC20(tokenAddress).balanceOf(user);
        ethBalance = user.balance;
    }

    /// @notice Get ETH balance of a logistics org or any address
    function getWalletETHBalance(
        address wallet
    ) external view returns (uint256) {
        return wallet.balance;
    }
}
