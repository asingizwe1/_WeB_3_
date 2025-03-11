//A thread launched via thread::spawn can outlive the thread that spawned it.
// the first spawned thread will in turn spawn a child thread that prints a message every second.
//The first thread will then finish and exit. When that happens, its child thread will continue running for as long as the overall process is running.


//join() method is used to wait for a spawned thread to finish execution before continuing
//Without join(), the main thread might exit before spawned threads complete their work, causing them to be abruptly
use std::thread;
fn main(){
//fn f(){
    let handle = thread::spawn(|| {
        let inner_handle =    thread::spawn(||{
loop{
    thread::sleep(std::time::Duration::from_secs(1));
    println!("Hello from the detached thread!");

}

    }); inner_handle.join().unwrap(); // Ensure the inner thread runs indefinitely

});
//}
//f() should join threads,else it will return immediately
//f();
handle.join().unwrap(); // Ensure the first thread does not exit early
}
