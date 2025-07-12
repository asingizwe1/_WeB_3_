1. Header Block
At the top of your script, include a brief summary:
```javascript
// SPDX-License-Identifier: MIT
// Script: DeployMyNFT.s.sol
// Purpose: Deploys the MyNFT contract and logs the address
// Author: asingizwe
// Date: 2025-07-12
```
2. Import Statements

```javascript
// Import Foundry's script base
import "forge-std/Script.sol";

// Import your contract
import { MyNFT } from "../src/MyNFT.sol";
```

3. Main Script Function

```javascript
contract DeployMyNFTScript is Script {
    function run() external {
        // Start broadcasting transactions to the network
        vm.startBroadcast();

        // Deploy the MyNFT contract
        MyNFT nft = new MyNFT();

        // Log the deployed address
        console.log("MyNFT deployed at:", address(nft));

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
```
