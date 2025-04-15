use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig, native_token::LAMPORTS_PER_SOL, signature::Keypair,
    signer::Signer, transaction::Transaction,
};
use spl_memo::build_memo;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let client = RpcClient::new_with_commitment(
        String::from("http://127.0.0.1:8899"),
        CommitmentConfig::confirmed(),
    );

    let signer_keypair = Keypair::new();
    let memo = String::from("Memo message to be logged in this transaction");

    let memo_ix = build_memo(memo.as_bytes(), &[&signer_keypair.pubkey()]);

    let transaction_signature = client
        .request_airdrop(&signer_keypair.pubkey(), 5 * LAMPORTS_PER_SOL)
        .await?;
    loop {
        if client.confirm_transaction(&transaction_signature).await? {
            break;
        }
    }

    let mut transaction = Transaction::new_with_payer(&[memo_ix], Some(&signer_keypair.pubkey()));
    /*
Signs the transaction using the signer’s keypair.
Also fetches the latest blockhash to prevent replay attacks.
     */
    transaction.sign(&[&signer_keypair], client.get_latest_blockhash().await?);

    match client.send_and_confirm_transaction(&transaction).await {
        Ok(signature) => println!("Transaction Signature: {}", signature),
        Err(err) => eprintln!("Error sending transaction: {}", err),
    }

    Ok(());}
    /*
    1. Testing Transactions in Local Validator
You’d use this code while developing your dApp to:

Simulate transactions.

Test wallet interactions.

Ensure that instructions like Memo are being processed.

✅ 2. Tagging or Logging Transactions
Adding a Memo is a clean way to add metadata:

Add messages for audits (e.g., "user123-stake").

Index transactions off-chain by tags.

Provide notes for humans reviewing explorers like Solscan.

✅ 3. Airdropping SOL in Dev/Test Environments
Useful when automating tests that need some SOL to pay fees.

Can be part of test scripts to prepare new keypairs.

✅ 4. Creating and Sending Transactions
The basic flow of:

Creating instructions.

Signing the transaction.

Sending and confirming it.

...is foundational for interacting with any Solana program (smart contract).

🔧 In Your Project
If you're:

Building a client interface (CLI, backend, or frontend with a backend),

Interacting with custom programs (smart contracts),

Wanting to track user actions or log events on-chain,
     */