use std::error::Error;
use std::fs::File;
use std::io::{self, Read};

fn read_file_contents(path: &str) -> Result<String, Box<dyn Error>> {
    let mut file = File::open(path)?; // could be io::Error
    let mut contents = String::new();
    file.read_to_string(&mut contents)?; // could be io::Error
    Ok(contents)
}

fn main() -> Result<(), Box<dyn Error>> {
    let data = read_file_contents("foo.txt")?;
    println!("File contents: {}", data);
    Ok(())
}
