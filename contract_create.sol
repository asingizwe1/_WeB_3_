// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//CREATE-2 feature
//using a special salt(magic number) to know where contract will be
//This contract serves as a factory to deploy instances of SmallFactory using the CREATE2 opcode.
contract MainFactory{address public LastDeployedAddress;  
function createNewFactory(uint _salt) public{//salt helps calculate determinsistic address
// a new SmallFactory contract is deployed using the CREATE2 opcode, which allows the contract address to be precomputed before deployment.
SmallFactory newFactory=new SmallFactory{
    salt:bytes32(_salt)}();
    //The last deployed contract’s address is stored in the LastDeployedAddress variable.
LastDeployedAddress = address(newFactory);
// address(newFactory) converts the deployed contract instance to its Ethereum address.
//This address is stored in LastDeployedAddress, so you can reference the last deployed contrac
}//lastContract holds the address of the most recently deployed SmallFactory.

}
//It serves as a template for contracts deployed using MainFactory.
contract SmallFactory{
    string public name = "I'm small factory";
}

/*
Use Cases for CREATE2
Smart Contract Wallets

Example: User wallets are created only when they make their first transaction, but their address can be known in advance.
Useful for gasless transactions and account abstraction.
Factory Contracts with Predictable Addresses

Example: Deploying multiple instances of a contract (e.g., a marketplace item factory), where external contracts or users need to interact with the instance before it's deployed.
Upgradeability via Self-Destruct and Re-deployment

Example: You deploy a contract, but later you decide to upgrade it. If the contract has a self-destruct function, you can deploy a new version at the same address using the same _salt.
Cross-Chain Bridges

Example: A bridge might need to generate the same contract address across multiple chains, so users can deposit funds in advance before the contract is actually deployed.
Gas Optimizations in Layer 2 (L2) Solutions

Example: In Optimistic Rollups or zk-Rollups, contracts can be precomputed off-chain and only deployed when needed.
*/

/*
Why Precompute a Contract Address Before Deployment?
Precomputing a contract address before deployment is useful when you need to interact with a contract before it exists or ensure it will always be deployed at a predictable address.

Real-World Uses of Precomputed Contract Addresses
1. Smart Wallets (Account Abstraction)
👉 Use case: You want users to have a wallet address before actually deploying their wallet contract.

The wallet can receive funds before being deployed.
It only gets deployed when the user actually needs to make a transaction.
Saves gas by avoiding unnecessary deployments.
🔹 Example:
A decentralized application (DApp) can generate a user's smart wallet address in advance and display it on the UI. The user can share this address and receive funds even before the contract is created.

2. Gas-Efficient Contract Deployment (Lazy Deployment)
👉 Use case: Instead of deploying many contracts upfront, only deploy when necessary.

Useful for NFT marketplaces, game items, or lending pools.
Reduces gas costs by deploying contracts only when users interact with them.
🔹 Example:
A blockchain game has 1,000 in-game assets, but contracts for these assets only get deployed when players buy or use them.

3. Cross-Chain or Off-Chain Pre-Verification
👉 Use case: You want the same contract to exist at a fixed address across multiple blockchains.

Helps bridges and multi-chain projects know where the contract will be deployed, even before it's actually created.
Makes it easier to reference contracts without needing external tracking.
🔹 Example:
A decentralized bridge can precompute a contract address and allow deposits before deployment, making cross-chain transfers faster.

4. Upgradable Contracts Without Proxy Patterns
👉 Use case: Instead of using complex proxy contracts, destroy and redeploy the contract at the same address.

When an upgrade is needed, the old contract self-destructs, and a new one is deployed at the same address using the same salt.
This keeps on-chain references intact while allowing changes.
🔹 Example:
A DAO deploys a governance contract. Later, an upgrade is needed. Instead of migrating everything, the old contract self-destructs, and the new version takes its place at the same address.

How Precomputed Addresses Work
Ethereum computes a contract address using:

Address
=
𝑘
𝑒
𝑐
𝑐
𝑎
𝑘
256
(
0
𝑥
𝑓
𝑓
+
𝐷
𝑒
𝑝
𝑙
𝑜
𝑦
𝑒
𝑟
𝐴
𝑑
𝑑
𝑟
𝑒
𝑠
𝑠
+
𝑆
𝑎
𝑙
𝑡
+
𝑘
𝑒
𝑐
𝑐
𝑎
𝑘
256
(
𝐵
𝑦
𝑡
𝑒
𝑐
𝑜
𝑑
𝑒
)
)
Address=keccak256(0xff+DeployerAddress+Salt+keccak256(Bytecode))
So, before deployment, you can calculate where the contract will be and use that address in transactions.

Final Thoughts: Should You Use This?
✅ If you need predictable contract addresses for users or external apps → YES.
✅ If you want to reduce unnecessary deployments (lazy deployment) → YES.
✅ If you want upgradeability without proxies → YES.
❌ If you don’t need predictable addresses → Just use normal CREATE.
*/