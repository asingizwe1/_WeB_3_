const {ethers, providers}= require("ethers");

//this time we shall talk to test network

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde");
//below is test if above works
//since block chains are slow we want to make asynchronous calls
const account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // Your account address 1 //sender
const account2 = '0xEfbB43f8645433d5d68593802B9f60B2924D9A95' // Your account address 2 //receiver

const privateKey1='ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' // Private key of account 1//sender
//we set up an insatnce of ethers wallet so that we can send crypto with private key
const ERC20_ABI=[
  
    "function transfer(address to, uint amount) returns (bool)", // function to transfer tokens from one account to another
    "function balanceOf(address) view returns (uint)",
];

const wallet= new ethers.Wallet(privateKey1,provider)

//signed transactions are transactions that are signed by the private key of the sender
//create js version of chain link smart contract
const address = ''//chain link contract address here, for example: '0x514910771AF9Ca656af840dff83E8264EcF986CA' for mainnet
const contract = new ethers.Contract(address,ERC20_ABI,provider)// create instance of contract

const main = async ()=>{
    
// we cant call transfer directly because it needs to be signed by the wallet
//we connect to our wallet with ethers
const contractWithWallet=contract.connect(wallet); // connect the contract to the wallet
const tx=await contractWithWallet.transfer(wallet); 
await tx.wait(); // wait for the transaction to be mined
console.log(tx); // print the transaction hash
}

main()

/*const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const account1 = '' // Your account address 1
const account2 = '' // Your account address 2

const privateKey1 = '' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = ''
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()*/