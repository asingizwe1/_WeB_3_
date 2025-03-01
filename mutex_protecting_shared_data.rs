use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
//Arc uses atomic operations to manage the reference count, making it safe to use in concurrent environments.
/*
MUTEX USCASES
Mining Coordination: Threads can safely update the nonce during Proof-of-Work
Transaction Pool: A mutex can ensure multiple threads don’t modify the mempool at the same time.
Shared Blockchain State: A mutex can protect access to the blockchain ledger.
*/

//Rc isnt thread safe
//Arc (short for Atomic Reference Counted) is a thread-safe smart pointer used to share ownership of data across multiple threads.

//Only one thread can lock the Mutex at a time.
//Other threads wait if the Mutex is locked.
//This prevents data races and corruption of the shared counter.

fn main(){
    let counter = Arc::new(Mutex::new(0)); // Shared counter wrapped in Mutex + Arc
    let counter_clone = Arc::clone(&counter); // Clone for the spawned thread
// Arc::clone(&counter); is used to create a new reference to the same data managed by the Arc without copying the actual data.

    let handle = thread::spawn(move || {
        loop {
           // .lock().unwrap() - Locks the Mutex to prevent multiple threads from modifying it simultaneously.
            let mut num = counter_clone.lock().unwrap(); // Lock the Mutex
            *num += 1; // Modify shared data
            println!("Spawned thread: Counter = {}", *num);
            thread::sleep(Duration::from_secs(1));
        //The spawned thread waits 1 second after printing
        }
    });
    //This staggered timing allows them to take turns accessing the counter smoothly!
    loop {
        let mut num = counter.lock().unwrap(); // Lock in main thread
        *num += 2; // Modify shared data
        println!("Main thread: Counter = {}", *num);
        thread::sleep(Duration::from_secs(2));
    }


}