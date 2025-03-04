use std::thread::spawn;
/*
Since a spawned thread can:
outlive the thread that spawned it (its parent thread)
run until the program exits
*/
//'static lifetime in Rust means that a value can live for the entire duration of the program.
//the closure (anonymous function) you pass to it must have a 'static lifetime
pub fn spawn<F, T>(f: F) -> JoinHandle<T> 
where
//FnOnce() -> T- The closure takes no arguments and returns a value of type T.
    F: FnOnce() -> T + Send + 'static,
    //Send: The closure and its data can be safely transferred to another thread.
    T: Send + 'static
{
    // [..]
}
use std::thread;
/*
The move keyword transfers ownership of message to the thread.
Since message is owned, it’s guaranteed to live as long as the thread does.
*/
fn main() {
    let message = String::from("Hello, world!");
    let handle = thread::spawn(move || {  // 👈 Using move makes message owned by the thread
        println!("{}", message);
    });

    handle.join().unwrap();
}