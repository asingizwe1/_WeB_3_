fn main() {
    //using the panic! macro to cause a crash
    panic!("crash and burn");

    //result type used to handle errors
    let q = z / y;

    let q: Result<i32, String> //you can decide to use enum or string for error handling
    = if y == 0 {
        Err("cant divide by zero".to_string())
    } else {
        Ok(z / y);
    };

    match q {
        Ok(v) => println!("result is {v}"),
        Err(e) => println!("error: {e}"),
    }
    //panic,option enum(presence or absence of a vale),result enum is the best
}
