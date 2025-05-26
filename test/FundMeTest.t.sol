//you could create a new folder and put it in unit test folder uneder tests ../../

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
uint256 constant GAS_PRICE = 1 ether;
uint256 STARTING_BALANCE=10 ether;
uint256 constant SEND_VALUE = 0.1 ether;

/*
✅ It gives you a unique test address just by giving a name like "alice", "bob", "owner", etc.

✅ It’s deterministic — meaning makeAddr("alice") will always return the same address every time.

✅ Great for testing roles or wallets without hardcoding random addresses.
 */
address USER = makeAddr("user");

function setUp() external {
    //our fundme variable of type fundme is gonna be the new fundme contract
//the owner of fundme is actually fundme test not the deployer
/*FundMe*/// fundme = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);
//instead of the above line, we create a new fundme contract
DeployFundMe deployFundMe=new DeployFundMe();
//because run is gonna return the fundme contract
fundme=deployFundMe.run();
vm.deal(USER, STARTING_BALANCE);

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
 
}
   function testFundFailsWithoutEnoughETH()public{

    //vm is a cheatcode handler — it's how you interact with the Foundry Virtual Machine during tests and scripts.

vm.expectRevert(); 
//if we write the above we expect the next line to revert
   // uint256 cat=1;//this will fail because test wont fail so test will fail
   //fundMe.fund();//will succeed coz this will fail
    }
    function testFundUpdatesFundedDataStructure() public{
//create a fake new address to send all our transactions 
vm.prank(USER);//the next tx will be sent by user
//so the fundme.fund will be sent by user
        fundme.fund{value: 0.1 ether}();
        uint256 amountFunded = fundme.getAddressToAmountFunded(address[this]);//it wasnt msg.sender
        assertEq(amountFunded,0.1 ether);
    }

function testWithdrawFromMultipleFunders() public funded {
    //ARRANGE
    uint160 numberOfFunders =10;
    uint160 startingFunderIndex = 2;
    for (uint160 i = startingFunderIndex; i < numberOfFunders; i++) {
        //create a fake new address to send all our transactions 
        //hoax isnt native solidity but a forge cheatcode
        //it creates a new address and sends it some eth
        //it also makes the address the sender of the next transaction
   //hoax(address, uint256) is a helper function provided by Foundry's vm cheat codes that sets up the next call to appear as if it is coming from a specific address with a specific balance.
   hoax(address(i),  SEND_VALUE);
   //SINCE WE ARE HOAXING IT IT MEANS WE ARE PRANKING IT
    //the next tx will be sent by user
          fundme.fund{value: SEND_VALUE}();
          //we shall have that many funders loop through the list and fund our contracts
    }
    uint256 startingOwnerBalance = fundme.i_owner().balance;
    uint256 startingFundMeBalance = address(fundme).balance;
    //anything sent in prank  is sent to be attended to by the contract in the brackets
   
   //ACT
   uint256 gasstart = gasleft();//1000
   //tell how much gas is left in txn call
   //u send alittle more gas than you intend to use
   vm.txGasPrice(GAS_PRICE);
    vm.startPrank(fundme.getowner());//use 200
    fundme.withdraw();//should have sent gas

/////////////////
function testWithdrawFromMultipleFundersCheaper() public funded{
    //ARRANGE
    uint160 numberOfFunders =10;
    uint160 startingFunderIndex = 2;
    for (uint160 i = startingFunderIndex; i < numberOfFunders; i++) {
        //create a fake new address to send all our transactions 
        //hoax isnt native solidity but a forge cheatcode
        //it creates a new address and sends it some eth
        //it also makes the address the sender of the next transaction
   //hoax(address, uint256) is a helper function provided by Foundry's vm cheat codes that sets up the next call to appear as if it is coming from a specific address with a specific balance.
   hoax(address(i),  SEND_VALUE);
   //SINCE WE ARE HOAXING IT IT MEANS WE ARE PRANKING IT
    //the next tx will be sent by user
          fundme.fund{value: SEND_VALUE}();
          //we shall have that many funders loop through the list and fund our contracts
    }
    uint256 startingOwnerBalance = fundme.i_owner().balance;
    uint256 startingFundMeBalance = address(fundme).balance;
    //anything sent in prank  is sent to be attended to by the contract in the brackets
   
   //ACT
   uint256 gasstart = gasleft();//1000
   //tell how much gas is left in txn call
   //u send alittle more gas than you intend to use
   vm.txGasPrice(GAS_PRICE);
    vm.startPrank(fundme.getowner());//use 200
    fundme.cheaperwithdraw();//should have sent gas
vm.stopPrank();
fundme.withdraw();
uint256 gasEnd = gasleft();//how much gas we've used
//800 left

uint256 gasUsed = (gasleft(); - gasEnd)*tx.gasPrice();
console.log("Gas used", gasUsed);
    //ASSERT
    //assert that the address to amount funded is zero
  //we should have removed all of them
  assert(address(fundme).balance == 0);
  assert(startingOwnerBalance + startingFundMeBalance == fundme.getowner().balance
  //when we test here there is nothing like gas
  );
}
////////////////////


vm.stopPrank();
fundme.withdraw();
uint256 gasEnd = gasleft();//how much gas we've used
//800 left

uint256 gasUsed = (gasleft(); - gasEnd)*tx.gasPrice();
console.log("Gas used", gasUsed);
    //ASSERT
    //assert that the address to amount funded is zero
  //we should have removed all of them
  assert(address(fundme).balance == 0);
  assert(startingOwnerBalance + startingFundMeBalance == fundme.getowner().balance
  //when we test here there is nothing like gas
  );
}

}

 