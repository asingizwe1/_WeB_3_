// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Script.sol";
import "../src/Review_Reward.sol"; // use forward slashes (important for cross-platform)

contract DeployReviewReward is Script {
    function run() external {
        // Load trusted signer from .env (e.g. BACKEND_SIGNER or RECIPIENT)
        address trustedSigner = vm.envAddress("BACKEND_SIGNER");
//address backendSigner = vm.addr(vm.envUint("BACKEND_SIGNER"));

        vm.startBroadcast();

        // Deploy the ReviewReward contract with trusted signer address
        ReviewReward reviewReward = new ReviewReward(trustedSigner);

        vm.stopBroadcast();

        console.log("ReviewReward deployed at:", address(reviewReward));
    }
}
