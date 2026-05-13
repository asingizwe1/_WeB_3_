//mutable reference lets a function borrow a value and change it
fn change_value(num: &mut i32) {
    *num += 10;
    // in this method you dereference the number and mutate it
}

fn main() {
    let mut x = 5;
    println!("{}", x);
    change_value(&mut x); //7x is immutable its supposed to be &mut x
    println!("{}", x);
}
