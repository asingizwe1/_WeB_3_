//datatypes of u32,i32 will be stored on the stack
//LIFO

//heap
//strings and vec<>
//slower access
//memory safety is enforced through Rust's ownership and borroeing rules
//data whose size is known at compile time is stored on the stack

fn main() {
    let x: i32 = 5;
    let arr: [i32; 3] = [1; 3];

    //size of string isnt known at compile time
    let mut s: String = "hello".to_string();
    s += " world";
    let mut v = vec![];
    v.push(1);
    v.push(2);
    //so basically the size of vec<> v will cahnge at compile time

    //we can force any datatype to be stored on the heap using Box<T>
    // we use a BOX to store it on the heap
    let boxed = Box::new(1i32); // this will put the value 1i32 on the heap
}
