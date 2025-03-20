//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//since we are using script we need to import from script file
import {Script} from "forge-std/Script.sol";
//since we are going to use fundMe we shall import
import {FundMe} from "../src/FundMe.sol";

//without extending Script we cant use vm keyword
contract DeployFundMe is Script{
    //we update tun to return a fundme contract
function run() external returns (FundMe)  {
    vm.startBroadcast();
    //deploying the contract
    FundMe fundme = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);
   vm.stopBroadcast();
   return fundme;

}}
