//Import the Module:
use std::sync::mpsc;
use std::thread;
fn main(){
//Create a Channel:
//mpsc-multi-producer single consumer
let (tx, rx) = mpsc::channel();  // tx = sender, rx = receiver
//Send Messages (from multiple threads):
let tx1 = tx.clone();
thread::spawn(move || {
    tx1.send("Hello from thread 1").unwrap();
});

thread::spawn(move || {
    tx.send("Hello from thread 2").unwrap();
});

for received in rx {
    println!("Got: {}", received);
}


}