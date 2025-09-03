//named struct
struct Account {
    x: String,
    y: u32,
}

//tuple struct
struct color(i32, i32, i32);

//unit like struct
struct AlwaysEqual;

fn main() {
    //we instantiate named struct with a named field
    //for a named struct you must provide values for all field when creating it
    let account1 = Account {
        x: String::from("0x23"),
        y: 23,
    };
    println!("account1 address: {}, balance: {}", account1.x, account1.y);

    //tuple struct
    let y = color(233, 54, 00);
    println!("color: {},{},{}", y.0, y.1, y.2);

    //unit like struct
    let subject = AlwaysEqual;
}
