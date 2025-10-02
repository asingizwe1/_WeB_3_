fn main() {
    let mut data_val = 5;

    let r1 = &data_val;   // immutable borrow
    let r2 = &data_val;   // another immutable borrow
    let r3 = &mut data_val; // ❌ error: cannot borrow `data_val` as mutable
                            // because it’s already borrowed as immutable

    println!("{}, {}", r1, r2);
}
