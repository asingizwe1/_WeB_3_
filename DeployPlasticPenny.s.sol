/*
 *
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/PlasticPenny.sol";

contract DeployPlasticPenny is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the PlasticPenny contract with initial supply
        uint256 initialSupply = 1_000_000 * 10 ** 18; // 1 million tokens with 18 decimals
        PlasticPenny token = new PlasticPenny(initialSupply);

        vm.stopBroadcast();
    }
}
