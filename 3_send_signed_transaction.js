//how to create transactions
//writing to the block chain
// the former one was reading ftom bloackchain

//interacting with smart contracts on blockchain
//how to read contracts from there
//This talks /reads from smart contract
//import ethers into file
const {ethers, providers}=require("ethers");

//this time we shall talk to test network

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde");
//below is test if above works
//since block chains are slow we want to make asynchronous calls
const account1 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // Your account address 1 //sender
const account2 = '0xEfbB43f8645433d5d68593802B9f60B2924D9A95' // Your account address 2 //receiver

const privateKey1='ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' // Private key of account 1//sender
//we set up an insatnce of ethers wallet so that we can send crypto with private key
const wallet= new ethers.Wallet(privateKey1,provider)

//signed transactions are transactions that are signed by the private key of the sender


const main = async ()=>{
//WE WANT TO SEE THE BALANCE CHANGE
//show account1 balance before transfer
const SenderBalanaceBefore=await provider.getBalance(account1)


//show account2 balance before transfer
const ReceiverBalanaceBefore=await provider.getBalance(account2)

console.log(`\n Sender balance before: ${ethers.utils.formatEther(SenderBalanaceBefore)}`)

console.log(`\n Receiver balance before: ${ethers.utils.formatEther(ReceiverBalanaceBefore)}`)

    //send ether
    //accepts an object and we can specify the properties of the transaction eg to:
    //it knows its coming from account 1 because it has private key of account 1
    const tx= await wallet.sendTransaction({to: account2, // receiver address
     //helps you parse or concert the amount to send from ether to wei (1 ether = 10^18 wei)
        value: ethers.utils.parseEther("0.0005") // amount to send in ether
        })

        //fetch transaction
        //we want to first wait for entire transaction to be complete like displaying on your wallet
        //there are 2 steps of transaction 1- send it 2- await for it to be mined/display on wallet
        
        //WAIT FOR TX TO BE MINED
        //if you want to wait for it to be mined
await tx.wait()//will wait for transaction to be mined
        console.log(tx)

        const senderBalanceAfter= await provider.getBalance(account1) 
        const recieverBalanceAfter =await provider.getBalance(account2)
        console.log(`\n Sender balance before: ${ethers.utils.formatEther(senderBalanceAfter)}`)

        console.log(`\n Receiver balance before: ${ethers.utils.formatEther(recieverBalanceAfter)}`)
        

    }
main()

/*const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const account1 = '' // Your account address 1
const account2 = '' // Your account address 2

const privateKey1 = '' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025")
    })

    await tx.wait()
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()*/