//String- when you need ownership
//sting is used when you have ownership or when you need to modify a string
//&str - when you hard code a string you use a string slice
//slice -  when you need to hard code or read a string
//for read only strings its easier to work with a string slice than a string
fn main() {
    let msg: String = String::from("Hello, Rust!");
    let msg: String = "Hello, Rust!".to_string();
    let length: usize = msg.len(); //length of the string
    println!("Length of the string: {}", length);

    //creating a string slice
    //you can start off with a string then create a slice of it
    let s: String = String::from("Louis");
    //we can create a string slice by referencing the string using &
    let q: &str = &s[0..2];
    println!("String slice: {}", q); //=> "Lo"
                                     //in rust the statemant below is  a string slice
    let g = "louis is clutch";
    //let g:&str = "louis is clutch";
    //STRING LITERALS ARE ALSO STRING SLICES

    // to convert it to a string
    let x: String = s.to_string(); //converts a string slice to a String

    // this is important when functions need specific parameters

    //how to append &str to String
    //appending is adding something extra to the string
    let mut s: String = String::from("Louis");
    s += " is clutch"; // appending a string slice to a String
                       //result is "Louis is clutch"
    println!("Appended String: {}", s);
    //sTRING INTERPOLATION
    //format macro
    let g = format!("{} {} is a great player", s, g); //creates a new string with the formatted content
    println!("{}", g);
    //will return  s g is a great player                                  // the re
}
