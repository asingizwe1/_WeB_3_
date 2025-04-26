use solana_client::nonblocking::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let client = RpcClient::new_with_commitment(
        String::from("http://127.0.0.1:8899"),
        CommitmentConfig::confirmed(),
    );

    let data_len = 1500;
    let rent_exemption_amount = client
        .get_minimum_balance_for_rent_exemption(data_len)
        .await?;

    println!("{rent_exemption_amount}");

    Ok(())
}