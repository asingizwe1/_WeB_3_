import { ethers } from "./ethers-6.7.esm.min.js"
import { abi, contractAddress } from "./constants.js"

//our function is broken down into a function select 

const connectButton = document.getElementById("connectButton")
const withdrawButton = document.getElementById("withdrawButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
connectButton.onclick = connect
withdrawButton.onclick = withdraw
fundButton.onclick = fund
balanceButton.onclick = getBalance

//connectbutton.onclick is gonna call our connect function
async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({//allows website to send transactions for you to actually sign
        method: // to see if there are accounts  in metamask to connect to
          "eth_requestAccounts"
      })
    } catch (error) {
      console.log(error)
    }
    connectButton.innerHTML = "Connected"
    const accounts = await ethereum.request({ method: "eth_accounts" })
    console.log(accounts)
  } else {
    connectButton.innerHTML = "Please install MetaMask"
  }
}

async function withdraw() {
  console.log(`Withdrawing...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      console.log("Processing transaction...")
      const transactionResponse = await contract.withdraw()
      await transactionResponse.wait(1)
      console.log("Done!")
    } catch (error) {
      console.log(error)
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask"
  }
}

//when metamask calls the fund function it converts it to function selector

async function fund() {
  //the fund function first gets the ETH amount
  const ethAmount = document.getElementById("ethAmount").value
  console.log(`Funding with ${ethAmount}...`)
  if (typeof window.ethereum !== "undefined") {
    //the statement makes an api call using the rpc url
    const provider = new ethers.BrowserProvider(window.ethereum)
    //etrhers gets rpc url out of it
    await provider.send('eth_requestAccounts', [])
    //signer helps us get the account that is connected
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    //contractAddress- what was deployed to
    //abi - has all functions we can call on that contract
    //the contract is an instance of the contract that we can interact with
    try {
      const transactionResponse = await contract.fund({
        value: ethers.parseEther(ethAmount),//converts the amount to wei == 0.1 ->100000000000000000000000
      })//the website just sends transaction to metamask.. so it never sees the private key
      await transactionResponse.wait(1)
    } catch (error) {
      console.log(error)
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    //the statement makes an api call using the rpc url
    const provider = new ethers.BrowserProvider(window.ethereum)
    try {
      const balance = await provider.getBalance(contractAddress)
      console.log(ethers.formatEther(balance))
    } catch (error) {
      console.log(error)
    }
  } else {
    balanceButton.innerHTML = "Please install MetaMask"
  }
}
