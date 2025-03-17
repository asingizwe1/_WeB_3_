use tokio::task;
//Think of Tokio like a task manager for Rust programs.
//It helps your program do many things at once without waiting for one task to finish before starting another.
//, imagine you have a chef in a restaurant. Instead of waiting for one dish to finish before starting the next one, the chef prepares multiple dishes at the same time
//Tokio helps Rust do the same thing by allowing multiple tasks to run simultaneously without blocking each other.


//tasks (lightweight, asynchronous threads)

//A task is like a small job that your program does. In Rust, 
//a task is an asynchronous (async) function that runs in the background without stopping the whole program.

//you can spawn tasks (lightweight, asynchronous threads) using the tokio or async-std runtime. 
//The most common way is with tokio::spawn, which runs an async task in the background.
#[tokio::main] //tells rust to use tokio
// Entry point for async main // is used to start an async runtime.
async fn main() {
    let handle = task::spawn(async {
        println!("Hello from spawned task!");
    });

    // Wait for the task to complete
    handle.await.unwrap();// ensures the task completes before the program exits.
}
