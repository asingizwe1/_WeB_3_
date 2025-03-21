//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
//we inherit from test contract
import {FundMe} from "../src/FundMe.sol";
// to prevent repetition of addresses we import the deployer
import {DeployFundMe} from "../script/DeployFundMe.s.sol";

contract FundMeTest is Test {
    //in all our tests the setUp() executes first first

//to solve the scoping you make fundme a storage/state variable
FundMe fundme;
function setUp() external {
    //our fundme variable of type fundme is gonna be the new fundme contract
//the owner of fundme is actually fundme test not the deployer
/*FundMe*/// fundme = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);
//instead of the above line, we create a new fundme contract
DeployFundMe deployFundMe=new DeployFundMe();
//because run is gonna return the fundme contract
fundme=deployFundMe.run();

}
//by making it a view you are restricting mutability
function testMinimumDollarIsFive() public view{
    //to call MINIMUM_USD  we beed access to fundme
    //since fundme is scoped we make it a state or storage variable
assertEq(fundme.MINIMUM_USD(), 5 * 10 ** 18);

}

function testOwnerIsMsgSender() public view{
  /*  console.log("FundMe.i_owner()",FundMe.i_owner());
    console.log("msg.sender",msg.sender);*/ 
    // so below we must check if fundMe.test is he owner
    assertEq(fundme.i_owner(),msg.sender/*address(this)*/);
}
function testPiceFeedVersionIsAccurate() public view {
    //to call PRICE_FEED_VERSION we need access to fundme
    //since fundme is scoped we make it a state or storage variable 
    uint256 version=fundme.getVersion();
    assertEq(version, 4);
 
}}

 