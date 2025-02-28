//When a Rust program starts, it runs on a single thread, the main thread.
//thread is created by the operating system and is responsible for running the main function.
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        loop {
            thread::sleep(Duration::from_secs(1));
            println!("Hello from a thread!");
        }
    });
    loop {
        thread::sleep(Duration::from_secs(2));
        println!("Hello from the main thread!");
    }
}
//Rust's standard library provides a module, std::thread, that allows you to create and manage threads
//You can use std::thread::spawn to create new threads and execute code on them.
