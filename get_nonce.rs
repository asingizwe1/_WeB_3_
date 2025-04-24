use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    pubkey::Pubkey,
    nonce::state::NonceState,
    account::ReadableAccount,
    commitment_config::CommitmentConfig,
};

fn main() {
    let client = RpcClient::new_with_commitment("https://api.devnet.solana.com".to_string(), CommitmentConfig::confirmed());

    let nonce_account_pubkey = Pubkey::from_str("7H18z3v3rZEoKiwY3kh8DLn9eFT6nFCQ2m4kiC7RZ3a4").unwrap();
    let account = client.get_account(&nonce_account_pubkey).unwrap();
    let nonce_data = NonceState::from_account(&account).unwrap();

    if let NonceState::Initialized(data) = nonce_data {
        println!("Nonce: {}", data.nonce);
        println!("Authorized Pubkey: {}", data.authorized.to_string());
    } else {
        println!("Nonce account is uninitialized");
    }
}
