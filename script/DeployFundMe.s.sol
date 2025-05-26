//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
//WE UPDATE THE BELOW TO WORK WIRTH OUR HELPER CONFIG
import {HelperConfig} from "./HelperConfig.s.sol";

//since we are using script we need to import from script file
import {Script} from "forge-std/Script.sol";
//since we are going to use fundMe we shall import
import {FundMe} from "../src/FundMe.sol";
//deploy me will point to whatever active network we are on
//without extending Script we cant use vm keyword
contract DeployFundMe is Script{
    //we update tun to return a fundme contract
function run() external returns (FundMe)  {
     // Create instance of HelperConfig
        HelperConfig helperConfig = new HelperConfig();

        // Fetch network config (containing priceFeed)
HelperConfig.NetworkConfig memory networkConfig = helperConfig.getActiveNetworkConfig();

//you're trying to use helperConfig.activeNetworkConfig() like it returns a NetworkConfig struct, but it actually returns a tuple when called externally.

////
//YOU CANT ASSIGN A FUNCTION TO A STRUCT VARIABLE
//////////////
        // Get the priceFeed from the networkConfig
        address ethUsdPriceFeed = networkConfig.priceFeed;
// the above would be a tuple if they were muliple addresses (address feed, address feed, address feed)
//we dont want to spend gas to deploy the above on chain
// any thing aftewr start broadcast will be deployed on chain
    vm.startBroadcast();//0x694AA1769357215DE4FAC081bf1f309aDC325306
    //deploying the contract
    FundMe fundme = new FundMe(ethUsdPriceFeed);
   vm.stopBroadcast();
   return fundme;

}}
