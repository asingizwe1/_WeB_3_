use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let blockchain = Arc::new(Mutex::new(vec![])); // Shared blockchain vector

    // Thread for mining a new block
    let blockchain_clone = Arc::clone(&blockchain);
    thread::spawn(move || {
        loop {
            let mut chain = blockchain_clone.lock().unwrap();
            // Simulate complex computation: mining
            let new_block = "Mined Block";
            chain.push(new_block);
            println!("Spawned thread: Added {}", new_block);
        }
    });

    // Main thread for transaction validation
    loop {
        let mut chain = blockchain.lock().unwrap();
        // Simulate complex computation: transaction validation
        let transaction = "Validated Transaction";
        chain.push(transaction);
        println!("Main thread: Added {}", transaction);
    }
}
