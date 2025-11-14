/*
Scenario

Your friend owns a house.

They give you a borrowed key to their house.

You put this borrowed key inside your wallet.

❗ What does that mean?

Your wallet (struct) now contains a reference to a key that belongs to someone else.

Therefore…

Your wallet must not exist longer than the house owner keeps the key valid.

If the friend burns their house tomorrow (drops the value)…
…but your wallet still contains a key to it…

💥 Your wallet is now holding a useless pointer to something that no longer exists — exactly what Rust prevents.

❗ This is why "the struct cannot outlive the referenced data".
*/

/*
How lifetimes achieve this

Lifetimes track two things:

1. The lifetime of the referenced value

Example: s lives from line 1 → line 10.

2. The lifetime of the reference

Example: r lives from line 3 → line 8.

The compiler checks:

r must not outlive s.

If:

r lives to line 12

s dies at line 10

Rust errors out.
*/
#[derive(Debug)]
struct Config<'a> {
    url: &'a str,
    port: u32,
    db_url: &'a str,
}

// Lifetime 'a can be omitted. Rust can automatically figure out the lifetime
impl<'a> Config<'a> {
    fn log(&self) {
        println!("Connecting to database at {}...", self.db_url);
        println!("server listening at {}:{}...", self.url, self.port);
    }
}
fn main() {
    let config = Config {
        url: "localhost",
        port: 3000,
        db_url: "db://localhost",
    };

    config.log();
}
