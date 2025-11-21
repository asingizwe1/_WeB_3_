use std::time::Duration;
use tokio::time::sleep;

async fn hello() {
    println!("Hello async Rust!");
}

async fn add(x: u32, y: u32) -> u32 {
    sleep(Duration::from_millis(1000));
    x + y
}
#[tokio::main]
async fn main() {
    hello().await;

    let sum = add(1, 2).await;
    println!("sum: {sum}");
}
