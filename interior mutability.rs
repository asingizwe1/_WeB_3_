struct Sender<T> {
    // Some fields (e.g., a communication channel)
}

impl<T> Sender<T> {
    pub fn send(&self, t: T) -> Result<(), SendError<T>> {
        // Implementation logic for sending `t`
        Ok(())
    }
}

fn main() {
    let sender: Sender<i32> = Sender {}; // Assuming Sender<T> has no fields
    sender.send(42).unwrap(); // Sending an integer value
}
