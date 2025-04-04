//import ethers into file
const {ethers}=require("ethers");

//json rpc is protocol blockchain apps use to communicate with the blockchain
//infura is a service that provides access to the ethereum network
// setting up json rpc url connection this is used to talk to block chian

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/961ae29afbb14e05a3d0a83e6d0eebde");
//below is test if above works
//since block chains are slow we want to make asynchronous calls
const main = async ()=>{// we have to use async in order to use await
    const balance = await provider.getBalance("0x59F3163ab39B8B90DAF57508bC1fAECB2F2cD374");//await - wait for function call to finish
    console.log(balance.toString())// you can format this
}
main()// call a wait function
/*const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()*/


