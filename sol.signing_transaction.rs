//offline signing flow in Solana
/*
Use this when you want to:

Sign transactions on an offline machine or HSM.

Have multi-party signing.

Build a cold wallet system.

Enable hardware device compatibility.


🔍 What's Missing Compared to TypeScript?
✔ Already Included in Rust Code:
Manual signing (offline style) with transaction.sign() (you can serialize message + use raw ed25519 too).

Signature verification.

Sending raw transaction.

*/
use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    signature::{Keypair, Signature, Signer},
    system_instruction,
    transaction::Transaction,
    message::Message,
    pubkey::Pubkey,
    hash::Hash,
    system_program,
    native_token::LAMPORTS_PER_SOL,
};
use std::sync::Arc;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let rpc_url = "http://127.0.0.1:8899";
    let client = RpcClient::new_with_commitment(rpc_url.to_string(), CommitmentConfig::confirmed());

    // Generate keypairs
    let fee_payer = Keypair::new();
    let alice = Keypair::new();
    let bob = Keypair::new();

    // Airdrop to fee_payer and alice
    client.request_airdrop(&fee_payer.pubkey(), LAMPORTS_PER_SOL).await?;
    client.request_airdrop(&alice.pubkey(), LAMPORTS_PER_SOL).await?;

    // Wait until the airdrops are confirmed
    client
        .confirm_transaction(&client.request_airdrop(&fee_payer.pubkey(), LAMPORTS_PER_SOL).await?)
        .await?;
    client
        .confirm_transaction(&client.request_airdrop(&alice.pubkey(), LAMPORTS_PER_SOL).await?)
        .await?;

    // Get recent blockhash
    let blockhash: Hash = client.get_latest_blockhash().await?;

    // Build the transfer instruction
    let transfer_ix = system_instruction::transfer(&alice.pubkey(), &bob.pubkey(), (0.1 * LAMPORTS_PER_SOL as f64) as u64);

    // 1. Create Message
    let message = Message::new(&[transfer_ix], Some(&fee_payer.pubkey()));

    // 2. Offline Sign Transaction
    let mut transaction = Transaction::new_unsigned(message.clone());

    let signers = [&fee_payer, &alice];
    transaction.sign(&signers, blockhash);

    // Optionally, verify the signatures
    let is_verified = transaction.verify().is_ok();
    println!("Signature verification: {}", is_verified);

    // 3. Send Transaction
    let signature: Signature = client.send_and_confirm_transaction(&transaction).await?;
    println!("Transaction sent with signature: {}", signature);

    Ok(())
}
