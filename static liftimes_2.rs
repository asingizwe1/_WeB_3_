use std::thread;
use std::time::Duration;

fn main() {
    // Spawning a new thread
    let handle = thread::spawn(move || {  // 👈 'move' makes sure everything used is 'static'
        for i in 1..=5 {
            println!("Count from spawned thread: {}", i);
            thread::sleep(Duration::from_secs(1));  // Simulate work
        }
        "Done counting"  // Return a static string (lives for the entire program)
    });

    // Main thread continues executing
    println!("Main thread is doing something else...");

    // Wait for the spawned thread to finish and get the result
    let result = handle.join().unwrap();
    println!("Spawned thread finished with message: {}", result);
}
