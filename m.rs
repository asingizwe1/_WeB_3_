use anyhow::Result;
use futures::stream::{FuturesUnordered, StreamExt};
use rayon::prelude::*;
use reqwest::Client;
use scraper::{Html, Selector};
use sha2::{Digest, Sha256};
use std::time::Duration;
use tokio::time::sleep;

/// Simulated heavy text analysis (CPU-bound).
/// Replace with real NLP, expensive regexes, ML model inference, etc.
fn heavy_text_analysis(text: &str) -> (usize, [u8; 32]) {
    // 1) pretend we do expensive tokenization + stats
    let word_count = text.split_whitespace().count();

    // 2) simulate heavy CPU by repeated hashing of the text
    let mut h = Sha256::new();
    for _ in 0..2000 {
        h.update(text.as_bytes());
        let _ = h.finalize_reset();
    }
    let digest = h.finalize();

    // Return the count and the final hash (as bytes)
    let mut out = [0u8; 32];
    out.copy_from_slice(&digest);
    (word_count, out)
}

/// Extract main text from a page (very simple)
fn extract_text(html: &str) -> String {
    let doc = Html::parse_document(html);
    // try body then fallback to whole text
    let selector = Selector::parse("body").unwrap();
    if let Some(body) = doc.select(&selector).next() {
        body.text().collect::<Vec<_>>().join(" ")
    } else {
        doc.root_element().text().collect::<Vec<_>>().join(" ")
    }
}

/// Process a single URL:
/// - Async: fetch the page
/// - CPU: do heavy_text_analysis offloaded to spawn_blocking; inside the blocking task use Rayon if processing many parts
async fn process_url(client: &Client, url: String) -> Result<()> {
    // Async fetch (I/O)
    let resp = client.get(&url).send().await?;

    if !resp.status().is_success() {
        println!("{} -> HTTP {}", url, resp.status());
        return Ok(());
    }

    let body = resp.text().await?;
    let text = extract_text(&body);

    // If we wanted to split into sections and parallelize inside CPU work:
    // let chunks: Vec<String> = text.chunks(4096).map(|c| c.to_string()).collect();

    // Offload heavy CPU work so we don't block Tokio runtime threads
    let analysis = tokio::task::spawn_blocking(move || {
        // If you have multiple sub-tasks to analyze you can use Rayon here.
        // For demo, we'll simulate splitting into virtual chunks and using Rayon.
        let chunks: Vec<&str> = text
            .split_whitespace()
            .collect::<Vec<_>>()
            .chunks(500)
            .map(|slice| slice.join(" "))
            .collect();

        // Rayon parallel processing across chunks (true CPU parallelism)
        let results: Vec<(usize, [u8; 32])> = chunks
            .par_iter()
            .map(|chunk| heavy_text_analysis(chunk))
            .collect();

        // Combine results into a summary
        let total_words: usize = results.iter().map(|r| r.0).sum();
        // For simplicity take the first hash as "representative"
        let rep_hash = results.get(0).map(|r| r.1).unwrap_or([0u8; 32]);

        (total_words, rep_hash)
    })
    .await?; // await the blocking result

    println!(
        "URL: {} -> words: {} rep_hash_prefix: {:02x}{:02x}{:02x}",
        url,
        analysis.0,
        analysis.1[0],
        analysis.1[1],
        analysis.1[2]
    );

    Ok(())
}

#[tokio::main]
async fn main() -> Result<()> {
    let client = Client::builder()
        .user_agent("crawler-analyzer/0.1")
        .timeout(Duration::from_secs(15))
        .build()?;

    // list of URLs to fetch (replace or read from file)
    let urls = vec![
        "https://www.rust-lang.org/".to_string(),
        "https://www.mozilla.org/".to_string(),
        "https://www.example.com/".to_string(),
        // ... add more
    ];

    // We will allow N concurrent fetches (I/O)
    let max_concurrency = 8usize;
    let mut in_flight = FuturesUnordered::new();

    for url in urls.into_iter() {
        // push a future that processes one URL
        let client_clone = client.clone();
        in_flight.push(tokio::spawn(async move {
            if let Err(e) = process_url(&client_clone, url.clone()).await {
                eprintln!("Error processing {} : {}", url, e);
            }
        }));

        // throttle concurrency
        if in_flight.len() >= max_concurrency {
            if let Some(_) = in_flight.next().await {
                // one finished, loop continues
            }
        }
    }

    // wait for remaining futures
    while let Some(_) = in_flight.next().await {}

    // small sleep so console output flushes nicely (not required)
    sleep(Duration::from_millis(200)).await;
    Ok(())
}
m.rs
