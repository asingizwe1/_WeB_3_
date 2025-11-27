/*
[package]
name = "blockchain_indexer"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1", features = ["full"] }
reqwest = { version = "0.11", features = ["json", "gzip"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
rayon = "1.7"
sha2 = "0.10"         # used to simulate heavy hashing work
hex = "0.4"

*/

/*
Scenario: an indexer that:

Polls an Ethereum JSON-RPC node for new blocks (I/O, network).

Downloads the block (I/O).

For every transaction in the block, runs a CPU-heavy “verification” (simulated heavy hash work) — real-world analogue: signature verification, merkle-proof recomputation, or heavy parsing/indexing. We offload that to a blocking thread pool and use Rayon inside it for parallel CPU work.

Why this pattern?

Polling / fetching blocks = I/O-bound → use async (Tokio) so the app stays responsive and can handle many concurrent network tasks.

Verifying / processing each transaction = CPU-bound → use spawn_blocking or a Rayon pool so heavy work doesn’t stall Tokio’s async runtime threads.
*/

/*
Replace rpc_url with your node endpoint (Infura, Alchemy, local Geth/Nethermind).

The heavy_verify_transaction function simulates CPU work using repeated SHA256 loops. In a real indexer you’d:

Verify transaction signatures (crypto heavy), or

Recompute Merkle proofs, or

Run bytecode analysis, or

Store and index parsed logs into DB (parsing/serialization can also be CPU-heavy).

We used tokio::task::spawn_blocking to ensure the CPU work runs on a dedicated blocking thread pool. If you run heavy CPU work directly in an async task (no spawn_blocking), you will block Tokio worker threads and degrade performance.

Inside the blocking task we used Rayon (par_iter) to parallelize per-transaction verification across CPU cores. That gives true parallel CPU utilization.

Be mindful of backpressure: if the node produces blocks faster than you can process, consider buffering, rate-limiting, or scaling out (multiple workers / distributed indexing).

For production indexers, consider batching DB writes, using worker queues (Redis / Kafka), and measuring CPU vs I/O to tune thread counts.

Pitfalls you’ll want to avoid

Blocking the Tokio runtime: running long CPU loops directly inside async tasks will block the runtime’s core threads and prevent it from doing other I/O.

Over-saturating threads: if you spawn too many blocking tasks at once you may exhaust system resources; tune thread-pool sizes.

Blocking inside Rayon on top of spawn_blocking: avoid creating nested huge thread pools without limits. Rayon has its own pool; mixing pools is fine but be mindful of total CPU usage.

Ignoring backpressure: queue growth means you’re falling behind — add monitoring and scaling.


*/

use reqwest::Client;
use serde::Deserialize;
use sha2::{Sha256, Digest};
use rayon::prelude::*;
use std::time::Duration;
use tokio::time::sleep;

/// Minimal JSON-RPC response types for Ethereum-ish API (very simplified)
#[derive(Debug, Deserialize)]
struct JsonRpcResponse<T> {
    jsonrpc: String,
    id: u64,
    result: T,
}

#[derive(Debug, Deserialize)]
struct Block {
    number: Option<String>,           // hex number like "0x10"
    hash: Option<String>,
    transactions: Vec<serde_json::Value>, // keep transactions generic for demo
}

/// Convert hex string like "0x10" to u64
fn hex_to_u64(hex: &str) -> Option<u64> {
    u64::from_str_radix(hex.trim_start_matches("0x"), 16).ok()
}

/// Simulated heavy verification per transaction.
/// Replace with real verification (crypto signature checks, merkle recompute, etc.)
fn heavy_verify_transaction(tx: &serde_json::Value) -> bool {
    // simulate heavy CPU work by hashing transaction content many times
    let tx_bytes = serde_json::to_vec(tx).unwrap_or_default();

    // Do repeated SHA256 to simulate CPU load
    let mut hash = Sha256::new();
    for _ in 0..2000 {
        hash.update(&tx_bytes);
        let out = hash.finalize_reset();
        hash.update(out);
    }
    // crude check - in real life you'd return verification result
    true
}

/// Process block in a blocking (CPU) context.
/// Uses Rayon inside to parallelize across CPU cores.
fn process_block_cpu(block: Block) -> usize {
    // Parallel process transactions
    let count = block.transactions.par_iter()
        .map(|tx| {
            let ok = heavy_verify_transaction(tx);
            if ok { 1usize } else { 0usize }
        })
        .sum();

    count
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // RPC endpoint (replace with your node)
    let rpc_url = "https://mainnet.infura.io/v3/YOUR_PROJECT_ID";
    let client = Client::new();

    // Last processed block number (start at 0 or fetch latest first time)
    let mut last_seen: u64 = 0;

    loop {
        // 1) Async: fetch latest block number (I/O)
        let req_body = serde_json::json!({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_blockNumber",
            "params": []
        });

        let resp = client.post(rpc_url)
            .json(&req_body)
            .send()
            .await?;

        if !resp.status().is_success() {
            eprintln!("RPC error status: {}", resp.status());
            sleep(Duration::from_secs(2)).await;
            continue;
        }

        let v: JsonRpcResponse<String> = resp.json().await?;
        let latest_hex = v.result;
        let latest = hex_to_u64(&latest_hex).unwrap_or(0);

        if latest <= last_seen {
            // no new block — await and poll again
            sleep(Duration::from_secs(2)).await;
            continue;
        }

        println!("New block(s) available: {} -> {}", last_seen, latest);

        // For every new block index, fetch and process
        for n in (last_seen + 1)..=latest {
            let hex = format!("0x{:x}", n);

            // Async fetch block by number (I/O)
            let body = serde_json::json!({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "eth_getBlockByNumber",
                "params": [hex, true]  // `true` to include full transactions
            });

            let resp = client.post(rpc_url)
                .json(&body)
                .send()
                .await?;

            let block_resp: JsonRpcResponse<Block> = resp.json().await?;
            let block = block_resp.result;

            let block_num = block.number.as_deref().and_then(hex_to_u64).unwrap_or(n);
            println!("Fetched block {} hash={:?} tx_count={}", block_num, block.hash, block.transactions.len());

            // 2) Offload CPU-heavy work to blocking pool so we don't block Tokio worker threads
            // spawn_blocking returns a JoinHandle inside async context
            let processed_count = tokio::task::spawn_blocking(move || {
                // This code runs on a separate thread pool for blocking work
                process_block_cpu(block)
            })
            .await?; // await the blocking result

            println!("Processed block {}: verified {} transactions", block_num, processed_count);

            last_seen = block_num;
        }
    }
}
