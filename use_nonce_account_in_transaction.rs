use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    signature::{Keypair, Signer, read_keypair_file},
    system_instruction,
    transaction::Transaction,
    pubkey::Pubkey,
    commitment_config::CommitmentConfig,
    nonce::state::NonceState,
    account::ReadableAccount,
};

fn main() {
    let client = RpcClient::new_with_commitment("https://api.devnet.solana.com".to_string(), CommitmentConfig::confirmed());

    let fee_payer = Keypair::new();
    client.request_airdrop(&fee_payer.pubkey(), 1_000_000_000).unwrap();
    std::thread::sleep(std::time::Duration::from_secs(5));

    let nonce_account_pubkey = Pubkey::from_str("7H18z3v3rZEoKiwY3kh8DLn9eFT6nFCQ2m4kiC7RZ3a4").unwrap();
    let nonce_auth = read_keypair_file("~/.config/solana/id.json").expect("failed to read nonce authority");

    let account = client.get_account(&nonce_account_pubkey).unwrap();
    let nonce_state = NonceState::from_account(&account).unwrap();

    let nonce_hash = match nonce_state {
        NonceState::Initialized(ref data) => data.nonce.clone(),
        _ => panic!("Invalid nonce account state"),
    };

    let transfer_ix = system_instruction::transfer(
        &fee_payer.pubkey(),
        &nonce_auth.pubkey(),
        1,
    );

    let advance_ix = system_instruction::advance_nonce_account(
        &nonce_account_pubkey,
        &nonce_auth.pubkey(),
    );

    let tx = Transaction::new_signed_with_payer(
        &[advance_ix, transfer_ix],
        Some(&fee_payer.pubkey()),
        &[&fee_payer, &nonce_auth],
        nonce_hash,
    );

    let sig = client.send_and_confirm_transaction(&tx).unwrap();
    println!("Transaction sent using nonce. Signature: {}", sig);
}

//HOW DURABLE NONCE WORKS
/*
🔨 How It Works (Step by Step)
1. Create a Nonce Account
You make a special Solana account that:

Is initialized with nonceInitialize

Stores a nonce value

Has an authorized keypair that can update it

Think of it like a time capsule that stores a unique token you can only use once.

2. Use the Nonce in a Transaction
When building a transaction:

Instead of setting recentBlockhash = getLatestBlockhash(), you set:

ts
Copy code
tx.recentBlockhash = nonceAccount.nonce;
You also add this as the first instruction:

ts
Copy code
SystemProgram.nonceAdvance({ noncePubkey, authorizedPubkey })
This marks the nonce as "used", and rotates in a new one — making it valid for one-time use (like a one-time password).

3. What Happens On-Chain
When the transaction is processed:

The runtime checks: "Did this nonce match what's in the account?"

If valid:

It allows the transaction

It replaces the nonce with a new value (so it can't be reused)

If reused or outdated: ❌ the transaction is rejected

🧠 Why Is It Called “Durable”?
Because it doesn’t expire in 2 minutes like normal blockhashes — it lasts until someone uses it or changes it. You control the timing.

🔒 Example Use Cases Revisited
Scenario	Why Durable Nonce?
Cold wallet signing	Sign on an offline machine and broadcast later
DAO multisig	Gather many signatures over time
Trading bot	Prepare transactions and trigger them exactly when needed
Compliance & approval flows	Review and delay execution securely
⚠️ Important Rules
The nonce account must always be the first instruction in the transaction (nonceAdvance)

You must sign with the nonce account authority

Once used, the nonce is replaced and can't be reused


*/
// 1. Create a nonce account and fund it with some SOL. The nonce account is a special type of account that stores the nonce value and is used to authorize transactions.
// 2. Initialize the nonce account with a nonce value. The nonce value is a hash of the recent blockhash and is used to prevent replay attacks. The nonce account must be signed by the fee payer and the nonce authority.
// 3. Use the nonce account as the recent blockhash in your transaction. This allows you to use the nonce value instead of a recent blockhash, which can expire if not used within a certain time frame.
// 4. Include a nonce advance instruction in your transaction. This instruction updates the nonce value in the nonce account and allows you to use it as the recent blockhash for future transactions. The nonce advance instruction must be signed by the nonce authority and the fee payer.
// 5. Send the transaction to the Solana network. The transaction will be processed and the nonce value will be updated in the nonce account. If the transaction is successful, you can use the new nonce value as the recent blockhash for future transactions.
// 6. If the transaction fails, you can retry it using the same nonce value. The nonce value will not expire and can be used multiple times until it is updated with a new nonce advance instruction.
// 7. You can also use the nonce account to authorize transactions on behalf of other accounts. This allows you to create a durable nonce that can be used by multiple accounts without having to create a new nonce account for each one.
// 8. To use the nonce account as a durable nonce, you must include the nonce advance instruction in every transaction that uses the nonce account. This ensures that the nonce value is always up to date and prevents replay attacks.

//USE_CASES
/*
🔒 Example Use Cases Revisited
Scenario	Why Durable Nonce?
Cold wallet signing	Sign on an offline machine and broadcast later
DAO multisig	Gather many signatures over time
Trading bot	Prepare transactions and trigger them exactly when needed
Compliance & approval flows	Review and delay execution securely
*/