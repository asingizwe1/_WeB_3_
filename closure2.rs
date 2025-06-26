fn apply<F>(func: F)
where
    F: Fn(i32) -> i32,
{
    println!("Result: {}", func(5));
}

fn main() {
    let double = |x| x * 2;
    apply(double);  // Output: Result: 10
}
