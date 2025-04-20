/*
Partial Sign Transaction
When a transaction requires multiple signatures, you can partially sign it. The other signers can then sign and broadcast it on the network.

Some examples of when this is useful:

Send an SPL token in return for payment
Sign a transaction so that you can later verify its authenticity
Call custom programs in a transaction that require your signature
*/

use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    pubkey::Pubkey,
    signature::{Keypair, Signature, Signer, read_keypair_file},
    system_instruction,
    transaction::Transaction,
    system_program,
};
use spl_token::{
    instruction::transfer_checked,
    state::Mint,
};
use spl_associated_token_account::{get_associated_token_address, instruction::create_associated_token_account};
use std::str::FromStr;
use anyhow::Result;
use bs58;

#[tokio::main]
async fn main() -> Result<()> {
    let connection = RpcClient::new_with_commitment(
        "https://api.devnet.solana.com".to_string(),
        CommitmentConfig::confirmed(),
    );

    // Parse Alice's public key
    let alice_pubkey = Pubkey::from_str("5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8")?;

    // Decode Bob's keypair from base58 string
    let bob_keypair_bytes = bs58::decode("4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp").into_vec()?;
    let bob_keypair = Keypair::from_bytes(&bob_keypair_bytes)?;

    // Token mint address (USDC devnet)
    let token_mint = Pubkey::from_str("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr")?;

    // Derive token account addresses
    let bob_token_account = get_associated_token_address(&bob_keypair.pubkey(), &token_mint);
    let alice_token_account = get_associated_token_address(&alice_pubkey, &token_mint);

    // Create associated token account for Alice if it doesn't exist
    let alice_token_info = connection.get_account(&alice_token_account).await;
    let mut instructions = vec![];

    if alice_token_info.is_err() {
        instructions.push(create_associated_token_account(
            &bob_keypair.pubkey(),
            &alice_pubkey,
            &token_mint,
        ));
    }

    // Get token mint info
    let mint_account = connection.get_account(&token_mint).await?;
    let mint_data = Mint::unpack(&mint_account.data)?;
    let decimals = mint_data.decimals;

    // Transfer 0.01 SOL from Alice to Bob
    instructions.push(system_instruction::transfer(
        &alice_pubkey,
        &bob_keypair.pubkey(),
        (0.01 * solana_sdk::native_token::LAMPORTS_PER_SOL as f64) as u64,
    ));

    // Transfer 1 token (10^decimals units) from Bob to Alice
    instructions.push(transfer_checked(
        &spl_token::id(),
        &bob_token_account,
        &token_mint,
        &alice_token_account,
        &bob_keypair.pubkey(),
        &[],
        1 * 10u64.pow(decimals as u32),
        decimals,
    )?);

    // Get a recent blockhash
    let recent_blockhash = connection.get_latest_blockhash().await?;

    // Construct transaction
    let mut transaction = Transaction::new_with_payer(&instructions, Some(&alice_pubkey));
    transaction.partial_sign(&[&bob_keypair], recent_blockhash);

    // Serialize to base64 for Alice to sign and send
    let serialized = transaction.serialize();
    let base64 = base64::encode(serialized);

    println!("Base64 Transaction for Alice to sign:\n{}", base64);

    // (Optional) Alice can later recover it with:
    // let tx = Transaction::from(Vec::<u8>::from_base64(base64_str)?);

    Ok(())
}
