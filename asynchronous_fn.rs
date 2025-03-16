use tokio::time::{sleep, Duration};
/*
Asynchronous (async) programming lets your program keep working while waiting for slow tasks like:
✅ Downloading a file
✅ Waiting for user input
✅ Fetching data from a database
*/
//Rust requires an async runtime like Tokio or async-std to actually run async functions.
  
//✅ The program does not freeze while waiting. It can still handle other tasks.
    #[tokio::main]
    async fn main() {
        println!("Before async call");
        my_async_function().await;  // 👈 Use `.await` to wait for the async function to finish
        println!("After async call");
    }
    
    async fn my_async_function() {
        println!("Start waiting...");
        sleep(Duration::from_secs(2)).await;  // 👈 Simulating a delay
        println!("Done waiting!");
    }
    

