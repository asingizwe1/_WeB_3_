//result -  way to handle  success or failure without crashing
//result helps us handle issues gracefully

//Result<T,E> -2 variants Ok(T) or Err(E)
//i do somthing if it went well here is T if it went wrong here is E
fn main() {
    fn divide(a: i32, b: i32) -> Result<i32, String> {
        if b == 0 {
            Err(String::from("cant be 0"));
        } else {
            Ok(a / b);
        }
        //or we could use match block - do one thing if its Ok or do another if its an Err
        match divide(10, 2) {
            Ok(result) => println!("result is {}", result),
            Err(e) => println!("error occured: {}", e),
        }
    }
}
