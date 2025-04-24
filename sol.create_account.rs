/*
Creating an account requires using the System Program createAccount instruction. The Solana runtime will grant the owner program of an account, access to write to its data or transfer lamports. When creating an account, we have to preallocate a fixed storage space in bytes (space) and enough lamports to cover the rent.
*/
use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig, native_token::LAMPORTS_PER_SOL, signature::Keypair,
    signer::Signer, system_instruction::create_account as create_account_ix,
    system_program::ID as SYSTEM_PROGRAM_ID, transaction::Transaction,
};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let client = RpcClient::new_with_commitment(
        String::from("http://127.0.0.1:8899"),
        CommitmentConfig::confirmed(),
    );

    let from_keypair = Keypair::new(); // payer
    let new_account_keypair = Keypair::new();
    let data_len = 0;
    let rent_exemption_amount = client
        .get_minimum_balance_for_rent_exemption(data_len)
        .await?;

    let create_acc_ix = create_account_ix(
        &from_keypair.pubkey(),        // payer
        &new_account_keypair.pubkey(), // new account
        rent_exemption_amount,         // rent exemption fee
        data_len as u64,               // space reseved for new account
        &SYSTEM_PROGRAM_ID,            //assigned program address
    );



    let mut transaction =
        Transaction::new_with_payer(&[create_acc_ix], Some(&from_keypair.pubkey()));
    transaction.sign(
        &[&from_keypair, &new_account_keypair],
        client.get_latest_blockhash().await?,
    );

    match client.send_and_confirm_transaction(&transaction).await {
        Ok(signature) => println!("Transaction Signature: {}", signature),
        Err(err) => eprintln!("Error sending transaction: {}", err),
    }

    Ok(())
}