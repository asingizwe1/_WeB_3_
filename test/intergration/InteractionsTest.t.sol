//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "forge-std/Test.sol";
//we inherit from test contract
import {FundMe} from "../../src/FundMe.sol";
// to prevent repetition of addresses we import the deployer
import {DeployFundMe} from "../../script/DeployFundMe.s.sol";
import {FundFundMe} from "../../script/Interactions.s.sol";
//WE WANT TO FUND USING OUR SCRIPTS AND WITHDRAW USING OUR SCRIPTS

contract InteractionsTest is Test {
    FundMe fundme;
    uint256 constant GAS_PRICE = 1 ether;
    uint256 STARTING_BALANCE = 10 ether;
    uint256 constant SEND_VALUE = 0.1 ether;

    function setUp() external {
        DeployFundMe deployFundMe = new DeployFundMe();
        //because run is gonna return the fundme contract
        FundMe fundme = deployFundMe.run();
        vm.deal(USER, STARTING_BALANCE);
        //we fund the contract
    }

    function testUserCanFundInteractions() public {
        //we are testing fundFundMe function in Interactions.s.sol
        //instead of funding with dfunctions
        FundFundMe fundFundMe = new FundFundMe();

        vm.prank(USER);
        vm.deal(USER, 1e18);
        fundFundMe.fundFundMe(address(fundMe));
        address funder = fundMe.getFunder(0);
        assertEq(funder, USER);
    }
}
