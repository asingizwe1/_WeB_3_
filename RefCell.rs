//RefCell-one &mut reference or many & references.
//This is checked at compile time.
//RefCell -- sometimes you want to mutate something inside a struct, even if the struct is not marked as mut

/**
 * How It Works
borrow() → gives you an immutable reference (Ref<T>)
borrow_mut() → gives you a mutable reference (RefMut<T>)
If you try to borrow mutably while another borrow exists, it will panic at runtime.
 */
//if you dont mark a struct as mut then you use RefCell
use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    // Borrow immutably
    {
        let val = data.borrow();
        println!("Immutable borrow: {}", val);
    } // val goes out of scope here

    // Borrow mutably
    {
        let mut val_mut = data.borrow_mut();
        *val_mut += 10;
        println!("Mutable borrow after change: {}", val_mut);
    }

    // Back to immutable borrow
    println!("Final value: {}", data.borrow());
}
/*
Normal Rust rules:
You can either:

Have one mutable reference (&mut T)
OR

Have multiple immutable references (&T, &T, ...)

// same time, you can't have both
*/

/**
 * What if you need to change data… but you only have an immutable reference?
Normally that’s not allowed.

But RefCell<T> says:

"Let me take care of the borrow checking at runtime instead of compile time."
 * It gives you:

borrow() → for reading (immutable)

borrow_mut() → for writing (mutable)
 */
