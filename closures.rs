//returning closures
fn add_one() -> impl Fn(i32) -> i32 {
    |x| x + 1
}
fn add_or_subtract(x: i32) -> Box<dyn Fn(i32) -> i32> {
    if x > 10 {
        Box::new(move |y| y + x)
    } else {
        Box::new(move |y| y - x)
    }
}
