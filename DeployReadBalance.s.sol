// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/BalanceViewer.sol"; // Adjust the path if your contract is elsewhere

contract DeployBalanceViewerScript is Script {
    function run() external {
        // Load your deployer wallet (from env or private key)
        address deployer = vm.envAddress("DEPLOYER_ADDRESS");
        address tokenAddress = vm.envAddress("PPEN_ADDRESS");

        // Start broadcast with private key (auto-pulled from env by Foundry)
        vm.startBroadcast();

        // Deploy contract
        BalanceViewer viewer = new BalanceViewer(tokenAddress);

        vm.stopBroadcast();

        console.log("BalanceViewer deployed at:", address(viewer));
    }
}
