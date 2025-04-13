use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig, native_token::LAMPORTS_PER_SOL, signature::Keypair,
    signer::Signer, system_instruction::transfer, transaction::Transaction,
};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let client = RpcClient::new_with_commitment(
        String::from("http://127.0.0.1:8899"),
        CommitmentConfig::confirmed(),
    );

    let from_keypair = Keypair::new();
    let to_keypair = Keypair::new();

    let transfer_ix = transfer(
        &from_keypair.pubkey(),
        &to_keypair.pubkey(),
        LAMPORTS_PER_SOL,
    );



    let mut transaction = Transaction::new_with_payer(&[transfer_ix], Some(&from_keypair.pubkey()));
    transaction.sign(&[&from_keypair], client.get_latest_blockhash().await?);

    match client.send_and_confirm_transaction(&transaction).await {
        Ok(signature) => println!("Transaction Signature: {}", signature),
        Err(err) => eprintln!("Error sending transaction: {}", err),
    }

    Ok(())
}