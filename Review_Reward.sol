// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Off_Chain_Sign.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
/**
Backend signs a message with: (user, amount, message, nonce)

User calls claimReward(...) with the signature.

Contract verifies the signature and sends _amount ETH to msg.sender.
 */
contract ReviewReward is VerifySignature, Ownable {
    address public trustedSigner;

    mapping(address => uint256) public nonces;
    mapping(bytes32 => bool) public usedHashes;

    event RewardClaimed(address indexed user, uint256 amount, string message);

    constructor(address _trustedSigner) {
        trustedSigner = _trustedSigner;
    }

    receive() external payable {} // Allow contract to receive ETH

    function claimReward(
        uint256 _amount,
        string memory _message,
        bytes memory _signature
    ) external {
        uint256 _nonce = nonces[msg.sender];

        bytes32 messageHash = getMessageHash(msg.sender, _amount, _message, _nonce);
        require(!usedHashes[messageHash], "Reward already claimed");

        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        require(
            recoverSigner(ethSignedMessageHash, _signature) == trustedSigner,
            "Invalid signature"
        );

        usedHashes[messageHash] = true;
        nonces[msg.sender] += 1;

        // Ensure the contract has enough ETH
        require(address(this).balance >= _amount, "Insufficient balance in contract");

        // Send ETH to user
        payable(msg.sender).transfer(_amount);

        emit RewardClaimed(msg.sender, _amount, _message);
    }

    function setTrustedSigner(address _signer) external onlyOwner {
        trustedSigner = _signer;
    }

    // Owner can withdraw ETH in case of emergency
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
