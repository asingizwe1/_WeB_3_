//how to add priority fees to a transaction
//Transaction (TX) priority is achieved by paying a Prioritization Fee in addition to the Base Fee
use solana_client::nonblocking::rpc_client::RpcClient;
//RPC stands for Remote Procedure Call. It's a communication protocol that allows a program on one computer to execute a procedure or function on another computer, as if it were a local call.
//Imports the asynchronous RPC client for communicating with a Solana node.
use solana_sdk::{
    commitment_config::CommitmentConfig, compute_budget, native_token::LAMPORTS_PER_SOL,
    signature::Keypair, signer::Signer, system_instruction::transfer, transaction::Transaction,
};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
//A local Solana validator is a private, single-node cluster that runs on a developer's local machine for testing and development purposes. It's essentially a local emulator of the Solana blockchain, allowing developers to build and test Solana programs without needing to connect to a public testnet or mainnet
    let client = RpcClient::new_with_commitment(
        String::from("http://127.0.0.1:8899"),
        CommitmentConfig::confirmed(),
//Connects to your local Solana validator at port 8899.
    );

    let signer_keypair = Keypair::new();
//Creates a new in-memory keypair (wallet) to send SOL from.
//default is like 200,000
    let modify_cu_ix = compute_budget::ComputeBudgetInstruction::set_compute_unit_limit(1_000_000);
//"Hey Solana, my transaction might take more effort than normal — please allocate up to 1,000,000 units for me.
//Requests a maximum of 1,000,000 compute units for this transaction.
//Default is 200,000. You may need more if the transaction does a lot of work (e.g., multiple smart contract calls).

    let add_priority_fee_ix = compute_budget::ComputeBudgetInstruction::set_compute_unit_price(1);
//"I'm willing to pay 1 lamport for each unit of compute this transaction uses, to incentivize faster inclusion."
//Sets a priority fee of 1 lamport per compute unit.
//This incentivizes validators to prioritize this transaction in times of congestion.
    let transfer_ix = transfer(
        &signer_keypair.pubkey(),
        &Keypair::new().pubkey(),
        LAMPORTS_PER_SOL,
    );

    let transaction_signature = client
        .request_airdrop(&signer_keypair.pubkey(), 5 * LAMPORTS_PER_SOL)
        .await?;
    loop {
        if client.confirm_transaction(&transaction_signature).await? {
            break;
        }
    }

    let mut transaction = Transaction::new_with_payer(
        &[modify_cu_ix, add_priority_fee_ix, transfer_ix],
        Some(&signer_keypair.pubkey()),
    );
    transaction.sign(&[&signer_keypair], client.get_latest_blockhash().await?);

    match client.send_and_confirm_transaction(&transaction).await {
        Ok(signature) => println!("Transaction Signature: {}", signature),
        Err(err) => eprintln!("Error sending transaction: {}", err),
    }//Sends the transaction and prints the result.

    Ok(())
}


/*
Solana, unlike Ethereum, doesn’t have a gas bidding market by default. But during network congestion, users can increase their compute unit price to prioritize their transaction.
💥 Use Case: Congested Network
Imagine a popular NFT mint or DeFi launch:
Thousands of users send transactions at once.
Validators are overloaded.
Solana processes 1000s of transactions per second, but some may get dropped or delayed.
💡 With a priority fee, your transaction is more profitable for the validator to include in the next block.

✅ When Would You Use This in Your Project?
If you're:

Writing a DeFi protocol with critical time-sensitive logic.

Launching an NFT minting app where users race to buy tokens.

Running a bot (like an MEV sniper or arbitrage tool).

Building a dApp that does multiple CPI (Cross Program Invocations) and may hit the default CU limit.

Deploying a backend that must submit high-priority instructions (like liquidations or staking updates).
*/
