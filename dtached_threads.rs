use std::thread;
fn main(){
fn f() {
    thread::spawn(|| {
        thread::spawn(|| {
            loop {
                thread::sleep(std::time::Duration::from_secs(1));
                println!("Hello from the detached thread!");
            }
        });
    });
}


}