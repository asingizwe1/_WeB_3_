//if let is shorter pattern matching
fn main() {
    let age = Some(20);
    // of rust opens and sees some value it extracts it while none doesnt match
    if let Some(x) = age {
        println!("age {}", x)
    }
}
