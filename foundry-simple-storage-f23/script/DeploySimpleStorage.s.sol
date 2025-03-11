//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
//to tell foundry this is a script we have to import some files

import "forge-std/Script.sol";
import "../src/storage.sol";
contract DeploySimpleStorage is Script {
function run() external returns (SimpleStorage){
    vm.startBroadcast();
SimpleStorage sS  = new SimpleStorage();//create instance of contract
      vm.stopBroadcast();
      return sS;
}

}
