use std::cell::Cell;

struct MyStruct {
    count: cell<i32>,
}
//⚠️ You can't get a reference to the value inside Cell, only copy it (get() returns a value, not a reference).
fn main() {
    let s = MyStruct {
        count: Cell::new(0),
    };
    println!("Before: {}", s.count.get());
    s.count.set(10); // ✅ no need for mut!
    println!("Then : {}", s.count.get());
}
