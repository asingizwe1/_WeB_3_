fn main() {
    let x: Option<i32> = None;
    let v: i32 = match &x {
        Some(val) => *val,
        None => panic!("Expected a value, found None"),
    };

    let f = x.unwrap();
    println!("{}", f);

    //result must have 2 parameters
    let x: Result<i32, String> = Err("error".to_string());
    let v: i32 = match &x {
        Ok(val) => *val,
        Err(_err) => panic!("Expected a value, found None"),
    };
    let f = x.unwrap();
    println!("{}", f);
}
