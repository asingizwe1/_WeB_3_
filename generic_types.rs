//generic types are types that are parameterized by pother types
/*
//this option is a generic type so its parameterized by another type
//T is a type place holder
enum Option<T> {
    //-> to become a CONCRETE TYPE Option<u32>
    Some(T), //  Some(u2),
    None,    //  None
}

// result is also an enum
enum Result<T, E> {
    Ok(T),
    Err(E),
}*/

struct Point<T> {
    x: T,
    y: T,
}

//functionm that swaps two values
fn swap_(a: u32, b: u32) -> (u32, u32) {
    (b, a)
}
//making the above function generic
//->(B,A) ---return type
fn swap<A, B>(a: A, b: B) -> (B, A) {
    (b, a)
}

fn main() {
    //in the main this is where you put the concrete type
    let v: Vec<T> = vec![1, 2, 3, 4];
    let b: Point<i32> = Point { x: 3, y: 4 };

    let mut a = 1;
    let mut b = 2;
    (a, b) = swap_(a, b);

    let /*mut*/ a: u32 = 1;
    let /*mut*/ b: i32 = 2;
    let (a, b) = swap(a, b); //this will fail because you are reassign items of a different type
                             //solution is that you remove the mut keyword then reinitialize a and b with let
}
