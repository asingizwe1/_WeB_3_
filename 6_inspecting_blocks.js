//getting info about a block
const {ethers}=require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde");

const main = async ()=>{
   const block=  await provider.getBlockNumber()
    console.log(`\nBlock Number: ${block}\n`)
  const blockInfo= await provider.getBlock(block)  
  console.log(blockInfo) 
  //if you want to pull transactions from the block you can use getBlockWithTransactions
  //you want to see transactions associated with the block
const {transactions}=await provider.getBlockWithTransactions(block)
console.log(`\nLogging first transaction in block:\n`)
console.log(transactions[0])//for first transaction
//you can loop through the transactions and get the transaction hash
for (let i=0;i<transactions.length;i++){
    console.log(`Transaction ${i}: ${transactions[i].hash}`)
}
main()}
//usecases 
//you can make a page of the token showing this like latest supply]
/*
🧠 What This Script Does
This script:

Connects to Ethereum Mainnet using Infura.

Fetches the latest block number.

Retrieves detailed info about that block.

Optionally pulls all transactions in that block.

Logs the first transaction in the block.

✅ Use Cases in Real Projects
Here’s when you’d use this block inspection script:

🔍 1. Blockchain Explorer Tools
You're building a custom block explorer like Etherscan.

This script gives you block details and lets you drill into transactions.

📈 2. Monitoring or Analytics Dashboards
You want to track network activity, like block times, transaction count, gas usage, etc.

Ideal for data visualization or performance analytics in dashboards.

🛡️ 3. Security Audits / Transaction Watching
You’re scanning blocks to detect suspicious or large transactions, e.g., whale activity or flash loan attacks.

Use transactions to filter and analyze tx data.

💼 4. DeFi or Dapp Backend Integration
For apps that respond to on-chain events, you might inspect recent blocks to find relevant transactions, e.g., token swaps or liquidity adds.

🔔 5. Notifications or Alerts
Set up alerts when a block includes a specific type of transaction (e.g., from a specific wallet or to a smart contract).

Use in bots or backend services to watch for activity.

⛓️ 6. Archiving or Off-Chain Analysis
If you want to store data from the blockchain (e.g., every block and transaction) in a database for research or indexing, this is your starting point.


*/
//ethers_examples\examples\6_inspecting_blocks.js
/*const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const main = async () => {
    const block = await provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)

    const { transactions } = await provider.getBlockWithTransactions(block)

    console.log(`\nLogging first transaction in block:\n`)
    console.log(transactions[0])
}

main()*/