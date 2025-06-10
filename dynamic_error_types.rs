use std::error::Error;
fn main() {
    fn might_fail() -> Reult<(), Box<dyn Error>> {
        let x = 0 / 2;
        println("x:", x);
        Ok(());
    }
}
