#![allow(unused)]

use std::time::{Duration, Instant};
use tokio::join;
use tokio::task::JoinHandle;

struct Tomato;
struct Lettuce;
struct Cheese;
struct Patty;
struct Bun;

struct Hamburger {
    pub tomato: Tomato,
    pub lettuce: Lettuce,
    pub cheese: Cheese,
    pub patty: Patty,
    pub bun: Bun,
}

async fn toast_bun() -> Bun {
    Bun
}

async fn cook_patty() -> Patty {
    Patty
}

async fn get_veggies() -> (Tomato, Lettuce) {
    (Tomato, Lettuce)
}

async fn get_cheese() -> Cheese {
    Cheese
}

// Sequential
async fn make_hamburger_seq() -> Hamburger {
    let bun = toast_bun().await;
    // Wait until bun is ready
    let patty = cook_patty().await;
    // and then wait until patty is ready
    let (tomato, lettuce) = get_veggies().await;
    // and then wait until veggies are ready
    let cheese = get_cheese().await;
    // and then wait until cheese is ready

    println!("🍔 is ready");

    Hamburger {
        tomato,
        lettuce,
        cheese,
        patty,
        bun,
    }
}

// Concurrent
async fn make_hamburger() -> Hamburger {
    // join! macro concurrently waits for all outputs
    let (bun, patty, (tomato, lettuce), cheese) =
        join!(toast_bun(), cook_patty(), get_veggies(), get_cheese());

    println!("🍔 is ready");

    Hamburger {
        tomato,
        lettuce,
        cheese,
        patty,
        bun,
    }
}

// main function needs an async runtime - code that will execute the async code
#[tokio::main]
async fn main() {
    // Async functions return a Future
    // Futures are lazy - does nothing until .await is called
    let fut = make_hamburger();
    // Call .await to execute and wait for output
    let hamburger = make_hamburger().await;

    // Spawning too many threads can crash this program (OS thread and memory limits)
    /*
    let mut handles = vec![];
    for i in 0..1000000 {
        handles.push(std::thread::spawn(move || {
            std::thread::sleep(Duration::from_millis(100));
            println!("{i}: 🍔 is ready");
        }));
    }

    for h in handles {
        h.join().unwrap();
    }
    */

    // Async / await
    // Spawning many async tasks will not crash this program
    let mut handles = vec![];
    for i in 0..1000 {
        // Inline async block
        let fut = async move // || -> no bars because its a future 
        {
            // Do not use std::thread:sleep.
            // It will block this thread and this code will run sequentially.
            tokio::time::sleep(Duration::from_millis(100)).await;
            println!("{i}: 🍔 is ready");
        };
        tokio::task::spawn(fut); //when we put furture,, it will be executed elsewhere
                                 // Spawning executes future immediately
        let handle: JoinHandle<()> = tokio::task::spawn(fut);
        handles.push(handle);
    }

    for h in handles {
        h.await.unwrap(); //since the handles are futures we need to call await on them
    }
}
//when you need parallel computation.. use native threads
//if function calls have waiting time then you should use async_await
