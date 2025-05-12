// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IPFSStorage {
    // This contract allows users to submit reviews for products    
    struct Review {
        address reviewer;
        string ipfsHash; // CID
        uint256 timestamp;
    }

    mapping(address => Review[]) public reviewsByProduct;

    function submitReview(address productId, string calldata ipfsHash) external {
        reviewsByProduct[productId].push(Review({
            reviewer: msg.sender,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp
        }));
    }

    function getReviews(address productId) external view returns (Review[] memory) {
        return reviewsByProduct[productId];
    }
}
