//how to use ether js to look at smart contract events
//any time you call smart contract it has ability to create an event
//events are like logs that are created when a function is called
//you can listen to events and get data from them

/*
Here’s a breakdown of real-world reasons to listen for smart contract events:

1. 🔁 Trigger Off-Chain Logic (Automation)
When an event is emitted:

You can automatically run code in your backend.

Examples:

Update a Discord bot when an NFT is minted

Auto-send an email when a new auction is created

Start a backend process like AI image generation

🧠 This is often done using ethers.js or web3.js with contract.on('EventName', callback).

..................
2. 🧾 Save Events to a Database (Indexing)
Events are used to build fast, queryable frontends.

Why? Smart contracts are bad at fetching structured data (you can't just say "give me all NFTs owned by X").

So you:

Listen for events like Transfer, Mint, Purchase

Save them to a database (like PostgreSQL, Firebase, etc.)

Use them to build your UI efficiently

🧰 Tools: The Graph, custom Node.js indexers, Moralis, etc.
.................................................
4. 🧠 Analytics & Insights
You can track behavior:

How many mints per day?

Who are the top users?

What’s the average transaction size?
..............................................
🤝 Third-party Integrations
You can offer:

Real-time updates to partner platforms

On-chain triggers for off-chain services like Stripe, Twitter, etc.
............
// What Are "On-Chain Triggers"?
An on-chain trigger usually means:

A smart contract emits an event (like PaymentReceived, NewMemberJoined, AuctionClosed)

Your off-chain system (like a Node.js server) listens for that event using tools like ethers.js

When that event happens, your server runs some code — and that code can connect to Stripe, Twitter, etc.

🧠 Why Can’t Smart Contracts Do This Directly?
Because smart contracts can’t make HTTP requests or talk to the internet.
They live entirely on the blockchain, isolated for security and determinism.

So we use off-chain listeners (like a Node backend with ethers.js) to be the bridge.

💥 Real-World Examples
1. 💳 Trigger a Stripe Payment or Subscription
Let’s say you have a Web3 course that people unlock access to by buying an NFT.

Smart contract emits: event NFTPurchased(address buyer)

Your backend sees that event

Your backend calls Stripe’s API to:

Start a subscription

Send a payment receipt

Assign access rights

💡 Now the blockchain just triggered a real-world payment flow.

2. 🐦 Tweet Automatically on Blockchain Actions
Want to show off every time someone mints your NFT?

Smart contract emits: event Minted(address user, uint tokenId)

Your backend (listening with ethers.js) picks it up

Backend sends a POST request to Twitter API with:

"🎨 New NFT Minted by 0xabc...! Token #123 is now live! [link]"

🔔 Totally automatic — powered by the blockchain.

3. 💬 Trigger Discord/Telegram Bots
Someone joins a DAO → Emit event NewMember(address)

Backend hears it → Discord bot welcomes them

Could even auto-assign roles or notify moderators

🧰 Tools You Can Use
ethers.js / web3.js: Listen for events from contracts

Webhooks: Send info to services like Zapier, IFTTT, or direct APIs

Libraries:

axios or fetch for making HTTP calls

Twitter, Stripe, SendGrid SDKs, etc.

Cloud functions: Run code serverlessly (like AWS Lambda, Firebase)


............
..............................................


1. User Dashboard
You want to show users live updates:

💸 When they receive tokens

🧠 When their NFT is minted

🎯 When a transaction they initiated is confirmed

How?

js
Copy code
contract.on("Transfer", (from, to, value, event) => {
  console.log(`Transfer: ${value} tokens from ${from} to ${to}`);
  // Update UI or trigger toast notification
});
2. Admin or Backend Listener
You want to automatically respond to blockchain activity:

🔁 Trigger off-chain actions
-Smart contracts can't make HTTP calls or interact with real-world APIs. But you can listen to events off-chain and take actions in response.
-Say you have a supply chain dApp:

When a package is marked as "Delivered" on-chain via a smart contract event…

You want to send an SMS to the customer.

js
Copy code
contract.on("PackageDelivered", (userAddress, trackingId) => {
  // Off-chain trigger: Send SMS using Twilio API
  sendSMS(userAddress, `Your package ${trackingId} has been delivered.`);
});
Triggering token unlocks based on vesting schedules

Updating inventory in a web2 backend

🧾 Save events to a database
You're building an NFT marketplace:

Every time someone buys an NFT, a Transfer event is emitted.

You save the transaction data to your PostgreSQL or MongoDB for fast querying.
contract.on("Transfer", async (from, to, tokenId, event) => {
  await db.collection("transfers").insertOne({
    from,
    to,
    tokenId,
    txHash: event.transactionHash,
    timestamp: Date.now()
  });
});
Use cases:

Building user dashboards

Leaderboards and stats pages

Displaying token history


🛑 Alert admins on suspicious activity

How? Set up a Node.js script that stays running and listens for events.
🛠 Example:
Your contract has a Withdraw() function. You want to be alerted if someone:

Withdraws over 1,000 ETH

Or a specific blacklisted wallet interacts

js
Copy code
contract.on("Withdraw", (user, amount) => {
  if (amount > ethers.utils.parseEther("1000")) {
    sendAdminAlert(`🚨 Big withdrawal by ${user}: ${amount.toString()} ETH`);
  }

  if (blacklist.includes(user)) {
    sendAdminAlert(`⚠️ Blacklisted wallet ${user} triggered Withdraw.`);
  }
});
Use cases:

Detecting rug pulls or mass minting

Logging bots attacking your contract

Flagging governance abuse in DAOs
*/

const {ethers}=require("ethers");

//json rpc is protocol blockchain apps use to communicate with the blockchain
//infura is a service that provides access to the ethereum network
// setting up json rpc url connection this is used to talk to block chian

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde");
//below is test if above works
//since block chains are slow we want to make asynchronous calls


// to talk to contract you create instance of contract
//abi - json object that describes interface or what functions the contract has

const address="0x6B175474E89094C44Da98b954EedeAC495271d0F"//DAI contract address
//ether helps you store abi's as arrays
//YOU CAN GRAB SOLIDITY SOURCE CODE AND TOSS IT IN AN ARRAY since all erc20 tokens have the same format
const ERC20_ABI=[
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "event Transfer(address indexed from, address indexed to, uint amount)"//this is the event we are going to listen to
];
//insatnce of contract
const contract = new ethers.Contract(address,ERC20_ABI,provider)// create instance of contract

const main = async ()=>{// we have to use async in order to use await
    //filter from one block (22265505) to another block (22265506)
 const block =    await provider.getBlockNumber()//this will give us the current block number
const transferEvents= await contract.queryFilter( 'Transfer',block-10,block)//this will give us all the transfer events from the contract
//queryFilter is used to get events from the contract
console.log(transferEvents)//this will give us all the transfer events from the contract
//this will give us all the transfer events from the contract
//to solve this we add a filter



}
main()// call a wait function


/*const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const block = await provider.getBlockNumber()

    const transferEvents = await contract.queryFilter('Transfer', block - 1, block)
    console.log(transferEvents)
}

main()*/