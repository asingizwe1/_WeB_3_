//here we shall have all ways we can interact with the contract
//we shall have a fund script and withdraw script
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {FundMe} from "../src/FundMe.sol";

//below will be our script for funding the contract
contract FundFundMe is Script {
    uint256 constant SEND_VALUE = 0.01 ether;

    function fundFundMe(address mostRecentlyDeployed) public {
        vm.startBroadcast();
        //most recently deployed is payable
        FundMe(payable(mostRecentlyDeployed)).fund{value: SEND_VALUE}();

        console.log("Funded contract with %s", SEND_VALUE);
    }
    //this is where we  put our code for everything
    // we shallfund our most recent contract
    function run() external {
        //broadcasts are in the run
        vm.startBroadcast();
        // WE SHALL HAVE OUR RUN FUNCTION CALL FUNDFUNDME FUNCTION
        address mostRecentDeployed = DevOpsTools
            .get_most_recent_deployed_contract("FundMe", block.chainid); // goes to boradcast folder and gets run-latest.json
        fundFundMe(mostRecentlyDeployed);
        vm.stopBroadcast();
    }
}

//below will be our script for withdrawing the funds
contract WithdrawFundMe is Script {
    function withdrawFundMe(address mostRecentlyDeployed) public {
        vm.startBroadcast();
        //most recently deployed is payable
        FundMe(payable(mostRecentlyDeployed)).withdraw();
        vm.stopBroadcast();
        console.log("Funded contract with %s", SEND_VALUE);
    }
    //this is where we  put our code for everything
    // we shallfund our most recent contract
    function run() external {
        //broadcasts are in the run
        vm.startBroadcast();
        // WE SHALL HAVE OUR RUN FUNCTION CALL FUNDFUNDME FUNCTION
        address mostRecentDeployed = DevOpsTools
            .get_most_recent_deployed_contract("FundMe", block.chainid); // goes to boradcast folder and gets run-latest.json
        withdrawFundMe(mostRecentlyDeployed);
        vm.stopBroadcast(); //MAKE SURE YOU FUND THE CONTRACT FIRST
    }
}
