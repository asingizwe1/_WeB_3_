// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//foundry cant allow imports FROM you have to explicitly download it
//  Note: The AggregatorV3Interface might be at a different location than what was in the video!

//we need to tell foundry that @chainlink/contracts/src/v0.8 should point to the folder in the LIB
//so we create something called a remapping to link to dependencies
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {PriceConverter} from "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    //PRIVATE VARIABLES ARE MORE GAS EFFICIENT THAN PUBLIC ONES
//storage variables should start with s_
    mapping(address => uint256) private s_addressToAmountFunded;
    address[] public s_funders;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address public /* immutable */ i_owner;
    uint256 public constant MINIMUM_USD = 5 * 10 ** 18;
AggregatorV3Interface private s_priceFeed;

    constructor(address priceFeed) {
        i_owner = msg.sender;
        //this price feed  is going to depend on the chain we are on
        s_priceFeed = AggregatorV3Interface(priceFeed);
    }

    function fund() public payable {
        require(msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }
//use of version
    function getVersion() public view returns (uint256) {
  //we call priceFeed version directly on s_priceFeed object
        return s_priceFeed.version();
    }

    modifier onlyOwner() {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }
    function cheaperWithdraw() public onlyOwner{
        uint256 fundersLength = s_funders.length;
        for(uint256 funderIndex=0; funderIndex<fundersLength;funderIndex++){
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;

        }
        //we only read it from storage one time
        //thats the point of s_ syntax you can tell what is in storage
    }
//every time you read size of array in your loop you eat alot of gas
    function withdraw() public onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < s_funders.length; funderIndex++) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        // // transfer
        // payable(msg.sender).transfer(address(this).balance);

        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");

        // call
        (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }
    // Explainer from: https://solidity-by-example.org/fallback/
    // Ether is sent to contract
    //      is msg.data empty?
    //          /   \
    //         yes  no
    //         /     \
    //    receive()?  fallback()
    //     /   \
    //   yes   no
    //  /        \
    //receive()  fallback()

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
 
    //to check if our storage variables are being updated
/*
View/pure functions (getters)
 */
 function getAddressToAmountFunded(address fundingAddress) external view returns (uint256){
return s_addressToAmountFunded[fundingAddress];

 }
   
   function getFunder(uint256 index) external view returns (address){
    return s_funders[index];
   }
}

// Concepts we didn't cover yet (will cover in later sections)
// 1. Enum
// 2. Events
// 3. Try / Catch
// 4. Function Selector
// 5. abi.encode / decode
// 6. Hash with keccak256
// 7. Yul / Assembly