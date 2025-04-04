//interacting with smart contracts on blockchain
//how to read contracts from there
//This talks /reads from smart contract
//import ethers into file
const {ethers}=require("ethers");

//json rpc is protocol blockchain apps use to communicate with the blockchain
//infura is a service that provides access to the ethereum network
// setting up json rpc url connection this is used to talk to block chian

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde");
//below is test if above works
//since block chains are slow we want to make asynchronous calls


// to talk to contract you create instance of contract
//abi - json object that describes interface or what functions the contract has

const address="0x15F5f5F29a819BF7B4B80BF55352E1e42707c94e"
//ether helps you store abi's as arrays
//YOU CAN GRAB SOLIDITY SOURCE CODE AND TOSS IT IN AN ARRAY since all erc20 tokens have the same format
const ERC20_ABI=[
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
//insatnce of contract
const contract = new ethers.Contract(address,ERC20_ABI,provider)// create instance of contract

const main = async ()=>{// we have to use async in order to use await
const name = await contract.name()
const symbol = await contract.symbol()
const totalSupply = await contract.totalSupply()

console.log("name",name)
console.log("symbol",symbol)
console.log("total supply",totalSupply)
const balance = await contract.balanceOf("0x6c6Bc977E13Df9b0de53b251522280BB72383700") // address of the wallet you want to check balance of
console.log(`Balance Returned: ${balance}`)
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
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const name = await contract.name()
    const symbol = await contract.symbol()
    const totalSupply = await contract.totalSupply()

    console.log(`\nReading from ${address}\n`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}\n`)

    const balance = await contract.balanceOf('0x6c6Bc977E13Df9b0de53b251522280BB72383700')

    console.log(`Balance Returned: ${balance}`)
    console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}\n`)
}

main()*/