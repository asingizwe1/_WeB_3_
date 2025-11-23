use std::thread;
use std::time::Duration;

fn handle_client(id: u32) {
    println!("Client {} connected…", id);
    thread::sleep(Duration::from_secs(2));
    println!("Client {} finished processing.", id);
}

fn main() {
    let mut handles = vec![];

    for client_id in 1..=3 {
        // spawn a new thread for each client
        let handle = thread::spawn(move || {
            handle_client(client_id);
        });

        handles.push(handle);
    }

    // wait for all threads to finish
    for handle in handles {
        handle.join().unwrap();
    }
}
