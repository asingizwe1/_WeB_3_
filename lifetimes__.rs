fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("apple");
    let s2 = String::from("banana");
    let result = longest(&s1, &s2);
    println!("Longest: {}", result);
}
