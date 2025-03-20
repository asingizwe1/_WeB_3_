//1 deploy mocks when we are on a local anvil chain- when we set this up well we could work with local chain and other chains with no problem
//2 deploy the real contracts when we are on a different chains
//eg sepolia eth/usd has a different address
//mainnet ETH/USD has a different address 

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
//import from our chainlink folder
import {Script} from "forge-std/Script.s.sol";
contract HelperConfig{
//order: if we are on a local anvil, we deploy mocks
//otherwise, grab the existing address from the live network
//since we are dealing with many addresses we can create types using structs
struct NetworkConfig{
    address priceFeed;//ETHUSD PRICE FEED
 }
//THE FUNCTIONS ARE GOING TO RETURN NETWORK CONFIG OBJECT
function getsepoliaEthConfig()  pure returns (NetworkConfig memory){

NetworkConfig  sepoliaConfig=NetworkConfig({priceFeed:0x8A753747A1Fa494EC906cE90E9f37563A8AF630e});

}

function getsepoliaEthConfig public pure( ){

    
}
}