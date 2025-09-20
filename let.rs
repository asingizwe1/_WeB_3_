fn main() {
    let x: Option<i32> = Some(5);

    match x {
        Some(value) => println!("The value is: {}", value),
        None => println!("No value found"),
    }

    //basically the case below also matches
    if let Some(value) = x {
        println!("The value is: {}", value)
    }
    //basically if its none then we arent executing anything
}
