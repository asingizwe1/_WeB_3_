// how long a refrence will live
//Rust does not use a garbage collector, so the compiler must know when each reference is valid.
/*
🧹 Why No Garbage Collector in Rust?
Rust does not use a garbage collector (GC) like Java or Go. Instead, Rust enforces memory safety at compile time using:

Ownership

Borrowing

Lifetimes


*/

/*
GC helps avoid that by:

Tracking which objects are still in use

Automatically deleting those that aren’t
*/
struct Book<'a> {
    title: &'a str,
}
//🔒 The data that the struct references must live as long as the struct instance using that lifetime.
fn main() {
    let name = String::from("Rust in Action");
    let b = Book { title: &name };

    println!("Book title: {}", b.title);
}
/*
Use lifetimes in structs only if they contain references (&).
If your struct owns the data (String, not &str), no lifetime is needed.
*/
fn longest<'a>(s1:&'a str, s2:&'a str) -> &'a str {
    if s1.len() > s2.len() {
        s1
    } else {
        s2
    }
}