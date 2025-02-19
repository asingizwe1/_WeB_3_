//and_then propagates errors properly
fn main(){
    //.map() with Some(value), leaving None unchanged
    let num = Some(5);
    let squared = num.map(|x| x * x);
    println!("{:?}", squared); // Output: Some(25)
    
    let none_value: Option<i32> = None;
    let result = none_value.map(|x| x * 2);
    println!("{:?}", result); // Output: None

//with Result<T,E>
let result: Result<i32, &str> = Ok(10);
let doubled = result.map(|x| x * 2);
println!("{:?}", doubled); // Output: Ok(20)

//with iterators
let numbers = vec![1, 2, 3, 4];
let squared_numbers: Vec<i32> = numbers.iter().map(|x| x * x).collect();
println!("{:?}", squared_numbers); // Output: [1, 4, 9, 16]

//AND_THEN
//SIMILAR TO .MAP BUT IS RESPONSIBLE WHEN TRANSFORMATION RETURNS ANOTHER OPTION<T> OR RESULT<t,e>
//AND_THEN WITH OPTION<T>
//.map wraps the result inside Some(), while .and_then expects the function to return an Option<T>
fn square_if_positive(x: i32) -> Option<i32> {
    if x > 0 {
        Some(x * x)
    } else {
        None
    }
}

let num = Some(3);
let result = num.and_then(square_if_positive);
println!("{:?}", result); // Output: Some(9)

let negative_num = Some(-3);
let result = negative_num.and_then(square_if_positive);
println!("{:?}", result); // Output: None

//AND_THEN WITH RESULT<T,E>
fn divide_by_two(x: i32) -> Result<i32, &'static str> {
    if x % 2 == 0 {
        Ok(x / 2)
    } else {
        Err("Not divisible by 2")
    }
}

let num = Ok(8);
let result = num.and_then(divide_by_two);
println!("{:?}", result); // Output: Ok(4)

let num = Ok(7);
let result = num.and_then(divide_by_two);
println!("{:?}", result); // Output: Err("Not divisible by 2")

}