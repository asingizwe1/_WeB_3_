/*

What is a Durable Nonce?
Solana transactions require a recent blockhash (used like a timestamp). Normally, these expire in about 2 minutes. But sometimes you want to:

Hold onto a transaction longer.

Get multiple signatures over time.

Sign offline or across devices.

A durable nonce is a special mechanism to extend the validity of a transaction indefinitely — until you use or replace that nonce.

🔐 Durable Nonce + Partial Signing — Use Cases
1. Multisig with Delayed Finalization
You want multiple people to sign a transaction over a longer period (hours/days):

Use a durable nonce instead of a recent blockhash.

Each signer can sign when ready.

Final transaction stays valid until executed.

✅ Use Case: DAOs or treasuries where signers are in different time zones or need manual review.

2. Cold Wallet Signing
You prepare a transaction on an online computer (with a durable nonce).

Move it to an air-gapped (cold) device.

Sign it offline.

Return it to an online device for broadcast.

✅ Use Case: Secure key management for institutional holders or crypto treasuries.

3. Transaction Preview/Review Workflows
For enterprise use or dApps:

Backend generates a transaction with a durable nonce.

User gets time to review, sign, maybe counter-sign with a multisig.

Once ready, the signed transaction is sent.

✅ Use Case: Legal contract approvals, treasury management, compliance workflows.

4. Pre-signed Transactions for Automation
Imagine:

A user signs a transaction with a durable nonce and sends it to a bot or script.

The script triggers the transaction at the right moment — e.g., when an on-chain condition is met.

✅ Use Case: Automated yield farming, DeFi bots, MEV protection.

🧪 Technical Note
When using a durable nonce:

The blockhash is replaced with a special nonce account's public key.

The transaction includes a NonceAdvance instruction.

All signers must sign a transaction with a durable nonce — so partial signing is crucial if you’re gathering them asynchronously.
*/
/*
recentBlockhash is an important value for a transaction. Your transaction will
be rejected if you use an expired blockhash (older than 150 blocks). Instead of a recent blockhash, you can use a durable nonce, which never expires. To use a durable nonce, your transaction must:

use a nonce stored in nonce account as a recent blockhash
put nonce advance operation in the first instruction
*/

use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    signature::{Keypair, Signer, read_keypair_file},
    system_instruction,
    system_program,
    transaction::Transaction,
    nonce,
    pubkey::Pubkey,
    commitment_config::CommitmentConfig,
};

fn main() {
    let rpc_url = "https://api.devnet.solana.com";
    let client = RpcClient::new_with_commitment(rpc_url.to_string(), CommitmentConfig::confirmed());

    let fee_payer = Keypair::new();
    client.request_airdrop(&fee_payer.pubkey(), 1_000_000_000).unwrap();
    std::thread::sleep(std::time::Duration::from_secs(5));

    let nonce_account = Keypair::new();
    let nonce_auth = read_keypair_file("~/.config/solana/id.json").expect("failed to read keypair");

    let rent = client.get_minimum_balance_for_rent_exemption(nonce::state::NonceState::size()).unwrap();

    let tx = Transaction::new_signed_with_payer(
        &[
            system_instruction::create_account(
                &fee_payer.pubkey(),
                &nonce_account.pubkey(),
                rent,
                nonce::state::NonceState::size() as u64,
                &system_program::id(),
            ),
            nonce::instruction::initialize_nonce_account(
                &nonce_account.pubkey(),
                &nonce_auth.pubkey(),
            ),
        ],
        Some(&fee_payer.pubkey()),
        &[&fee_payer, &nonce_account],
        client.get_latest_blockhash().unwrap(),
    );

    let sig = client.send_and_confirm_transaction(&tx).unwrap();
    println!("Nonce account created: {}", nonce_account.pubkey());
    println!("Tx: {}", sig);
}


