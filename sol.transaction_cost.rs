
//Imports the async (nonblocking) Solana RPC client so we can interact with a Solana node using HTTP.
use solana_client::nonblocking::rpc_client::RpcClient;
//RpcClient: Allows us to communicate with a Solana node (nonblocking = async).
use solana_sdk::{
    commitment_config::CommitmentConfig, native_token::LAMPORTS_PER_SOL, signature::Keypair,
    signer::Signer, transaction::Transaction,
};//Keypair, Signer: Helps sign and authorize transactions.
use spl_memo::build_memo;
//Imports a helper function to build a "Memo" instruction, a standard way to attach a human-readable note to a transaction on Solana.

#[tokio::main]
async fn main() -> anyhow::Result<()>{
//The return type anyhow::Result<()> allows us to use ? for error handling {
    let client = RpcClient::new_with_commitment(
        String::from("http://127.0.0.1:8899"),//Connects to a local Solana test validator (localhost:8899).
        CommitmentConfig::confirmed(),// ensures the node only returns info after 1+ confirmation
    );
//Creates a new async RPC client connected to a local Solana test validator (127.0.0.1:8899)
//CommitmentConfig::confirmed() means you want to wait until the transaction is confirmed (not just processed).


//Creates a brand new wallet (public/private keypair) in memory. Useful for temporary tests.
    let signer_keypair = Keypair::new();//generates a temporary wallet for this example
    let memo = String::from("Memo message to be logged in this transaction");//A plain string that will be embedded in the transaction via the Memo program.

    //Builds a Memo instruction, which attaches a message to the transaction.
    let memo_ix = build_memo(memo.as_bytes(), &[&signer_keypair.pubkey()]);
    let mut transaction = Transaction::new_with_payer(&[memo_ix], Some(&signer_keypair.pubkey()));
    transaction.sign(&[&signer_keypair], client.get_latest_blockhash().await?);

    let transaction_signature = client
        .request_airdrop(&signer_keypair.pubkey(), 5 * LAMPORTS_PER_SOL)
        .await?;
/*
Requests 5 SOL from the test validator's airdrop faucet.
This only works on testnet or local validator—not on mainnet.
*/

    loop {
        if client.confirm_transaction(&transaction_signature).await? {
            break;
        }
    }
/*
Requests 5 SOL from the test validator's airdrop faucet.
This only works on testnet or local validator—not on mainnet.
*/  


    let estimated_units = estimate_cu_used(&client, &transaction).await?;
    println!("Transaction estimated to consumed {estimated_units} compute units");

    let tx_cost = client.get_fee_for_message(transaction.message()).await?;
    println!("Transaction is estimated to cost {tx_cost} lamports");

    match client.send_and_confirm_transaction(&transaction).await {
        Ok(signature) => println!("Transaction Signature: {}", signature),
        Err(err) => eprintln!("Error sending transaction: {}", err),
    }

    Ok(())
}

async fn estimate_cu_used(client: &RpcClient, tx: &Transaction) -> anyhow::Result<u64> {
    let sim_res = client.simulate_transaction(tx).await?;

    let units_consumed = sim_res
        .value
        .units_consumed
        .expect("couldn't estimate CUs used");

    Ok(units_consumed)
}


























  
    