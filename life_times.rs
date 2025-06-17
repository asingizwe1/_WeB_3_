// We define one lifetime 'a that both x and y must live at least as long as.
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // x: &'a str and y: &'a str: both references must live as long as 'a.
    //-> &'a str: the result will also live as long as 'a.
    /*Rust doesn't know if you're going to return x or y. So, it says:

    "I can only return one of these safely if both are alive for the same amount of time." */
    if x.len() > y.len() {
        x // both x and y must live as long as 'a, so returning x or y is safe
    } else {
        y
    }
}
//<'a> means there is some lifetime  'a that both x and y must live at least as long as
fn main() {
    let a = String::from("hello");
    let b = String::from("hi");
    let result = longest(&a, &b);
    // We borrow the Strings and pass the references
    println!("Longest: {}", result);
}
/*
. Lifetime Graph:
rust
Copy code
main lifetime: ──────────────────────────────┐
a: &String("hello") ------------------------┐│
b: &String("hi") --------------------------┐││
result (same lifetime as a or b) ←───────┐ │││
                                       ┌─▼─▼▼┘
fn longest<'a>(x: &'a str, y: &'a str) ┘
As long as a and b are still alive, returning a reference to either is fine.

*/
