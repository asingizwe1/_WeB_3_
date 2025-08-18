pub fn hello() -> String {
    let x = String::from("Hello, RUST!");
    println!("{}", x);
    return x;
}

pub fn greet(name: &str) -> String {
    //appending a string slice to a String
    let mut x = String::from("Hello, ");
    x += name;
    return x;
}

pub fn append(mut s: String) -> String {
    let y = format!("{}!", s);
    return y;
}
fn main() {
    //main has an implicit return type of (), the compiler complains that you’re “returning” a String instead of ().
    //so find context to use the functions
    println!("{}", hello());
    println!("{}", greet("Louis"));
    let j = "timmy"; //string slices are hardcoded
    println!("{}", append(j.to_string()));
}
