use std::sync::mpsc; // Import module for channels
use std::thread;// Import for multi-threading
use std::time::Duration;// Import to simulate delays
//channels allow safe communication between threads
// Simulated transaction type
struct Transaction {
    id: u32,
    amount: f64,
}

// Main function
fn main() {
   // Step 1: Create a channel (tx = sender, rx = receiver)
    let (tx, rx) = mpsc::channel();

    // Spawn a thread to simulate incoming transactions
    let tx_clone = tx.clone();//// Clone sender to use in the new thread
    //We clone the sender (tx) because the original will remain in the main thread.
    thread::spawn(move || {// move keyword moves ownership of tx_clone into the thread.
        for i in 1..=5 {
            let transaction = Transaction {
                id: i,
                amount: i as f64 * 10.0,
            };
            println!("📥 New transaction received: ID = {}, Amount = ${}", transaction.id, transaction.amount);
//tx_clone.send(transaction) sends the transaction to the main thread via the channel.
            tx_clone.send(transaction).unwrap();  // Send transaction to main thread
            thread::sleep(Duration::from_secs(1));//thread::sleep() simulates a delay between incoming transactions.
        }
    });

    // Main thread: processes transactions sequentially
    for received in rx {
        /*
Cashier (main thread) takes one item at a time from the line.
Processes it for 2 seconds (validation and block addition).
Moves to the next item until no more are left.
         */
        //The receiver (rx) blocks until it gets a message, ensuring sequential processing.
        println!("✅ Processing transaction ID = {}, Amount = ${}", received.id, received.amount);
        // Simulate validation and block addition
        thread::sleep(Duration::from_secs(2));
        println!("✔️ Transaction ID = {} added to block!", received.id);
    }
}
/*
Other threads = Customers giving items (transactions).
Main thread = Cashier processing items one-by-one.
Channel = The line where customers wait.
*/
