use std::thread;
//Closures in Rust are super powerful — they let you define anonymous functions that can capture variables from their environment, making them perfect for short, flexible operations like filtering, mapping, sorting, etc
fn apply<F>(func: F)
where
    F: Fn(),  // Fn trait defines callable
{
    func();
}
fn main() {
    //..Basic Closure
    let add = |a, b| a + b;  // closure with two parameters
    println!("Sum: {}", add(2, 3));

//Closure Capturing Environment
let x = 10;
let add_x = |n| n + x;  // captures x from the environment
println!("Result: {}", add_x(5));  // 15
//Passing Closures to Functions (like callbacks)
fn apply<F>(func: F)
where
    F: Fn(),  // Fn trait defines callable
{
    func();
}

//Using Closures in Iterator Methods
fn main() {
    let nums = vec![1, 2, 3, 4, 5];

    let squares: Vec<i32> = nums.iter().map(|x| x * x).collect();

    println!("{:?}", squares); // [1, 4, 9, 16, 25]
}

//Returning Closures from Functions
fn make_multiplier(factor: i32) -> impl Fn(i32) -> i32 {
    move |x| x * factor
}


    let double = make_multiplier(2);
    let triple = make_multiplier(3);

    println!("2 * 5 = {}", double(5)); // 10
    println!("3 * 5 = {}", triple(5)); // 15

//Closures in Multi-threading

let data = vec![1, 2, 3];

let handle = thread::spawn(move || {
    println!("Data in thread: {:?}", data);
});

handle.join().unwrap();
}
