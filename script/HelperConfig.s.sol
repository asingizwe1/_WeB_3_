/*
meant to help your deployment script decide what address to use for the Chainlink Price Feed (ETH/USD) — depending on which network you are deploying to.

When you deploy to testnets (e.g. Sepolia) or mainnet, the real Chainlink price feed address already exists. You just need to plug in that address.

But when you deploy to a local Anvil chain, that price feed does not exist.

So, you need to deploy a fake (mock) price feed contract locally so you can test your app.


*/

//1 deploy mocks when we are on a local anvil chain- when we set this up well we could work with local chain and other chains with no problem
//2 deploy the real contracts when we are on a different chains
//eg sepolia eth/usd has a different address
//mainnet ETH/USD has a different address 

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
//import from our chainlink folder
import {Script} from "forge-std/Script.sol";
import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";
contract HelperConfig is Script //in order to have access to cm
{
    //since we have network config we now have access to active network config
   NetworkConfig public activeNetworkConfig;//we set it to whatever current network we are on
// Solidity automatically generates a getter for public variables, but it returns the struct as a tuple
// you can’t use dot notation like .priceFeed directly on it in another contract or script.

//order: if we are on a local anvil, we deploy mocks
//otherwise, grab the existing address from the live network.....// on a local network those addresses are not going to be available
//since we are dealing with many addresses we can create types using structs
// YOU DEFINE THE VALUES BELOW SO THAT YOU DONT FORGET WHAT THEY ARE
uint8 public constant DECIMALS = 8;
int256 public constant INITIAL_PRICE = 2000e8;
/*
when you mark a struct as public, the compiler does not automatically create a getter for individual members (like priceFeed).
Instead, the getter will only return the entire struct tuple, and you can’t access .priceFeed directly from outside another contract like you did here:
address ethUsdPriceFeed = helperConfig.activeNetworkConfig.priceFeed; //

 */
struct NetworkConfig{
    address priceFeed;//ETHUSD PRICE FEED address
 }



 //IF YOU WANT TO DEPLOY TO ANY OTHER CHAIN YOU JUST ADD THE ADDITIONAL NETWORK CONFIG

 //IMAGINE we were on sepolia
 constructor() {
    //chainid- chain's current id
if(block.chainid==11155111){
    activeNetworkConfig=getSepoliaEthConfig();
 }else{
   // return sepoliaConfig;
    // Local Anvil network (deploy mock)
            activeNetworkConfig = getOrCreateAnvilEthConfig();
 }}
//THE FUNCTIONS ARE GOING TO RETURN NETWORK CONFIG OBJECT
//its pure because it doesnt modify the state of blockchain
function getSepoliaEthConfig() internal pure returns (NetworkConfig memory){
// we pass the object with the address of the price feed
//initially when we called would fail because contract dowsnt exit on chain
//now that we have helper config we deploy our fake price
NetworkConfig memory sepoliaConfig=NetworkConfig({priceFeed:0x8A753747A1Fa494EC906cE90E9f37563A8AF630e});
return sepoliaConfig;//grabbing a network address from the live network
}
// on a local network those addresses are not going to be available
//because im creating a mock locally
//its getting and also creating the contracts
function getOrCreateAnvilEthConfig() 
 internal returns (NetworkConfig memory){
if(activeNetworkConfig.priceFeed!=address(0))//have we set up price feed to something
{
   //it means have we set the price feed to something remember we set it to 0
return activeNetworkConfig;
}//the reason for the above is that when we call getsepoliaEthConfig 
//without the above we create a new price feed


//we shall deploy the contracts ourselves on the anvil config
//1.Deploy mocks(fake contact)- its gonna be real in the sense that we own it
//2.Return mock address
vm.startBroadcast();// the function cant be pure since we are using vm
MockV3Aggregator mockPriceFeed=new MockV3Aggregator(DECIMALS,INITIAL_PRICE);

vm.stopBroadcast();
NetworkConfig memory anvilConfig=NetworkConfig({priceFeed:address(mockPriceFeed)});
return anvilConfig;
}

function getActiveNetworkConfig() public view returns (NetworkConfig memory) {
    return activeNetworkConfig;
}
//this function is going to return the active network config


}