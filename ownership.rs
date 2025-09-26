fn main() {
    //1 - each value has an owner

    let s = String::from("hello"); // s is the owner of the string "hello"
                                   //owner of string is s
    let i = 3;
    //owner of 3 is i

    //there can be one and only one owner at a time
    let s = String::from("hello");
    let s1 = s; // ownership of string "hello" is moved from s to s1
    let s2 = s1; // ownership of string "hello" is moved from s1 to s2
                 //when you try to print s and s1 here it will give an error because ownership has been moved to s2
    println!("{}", s2);

    //3 - when the value goes out of scope it cant be called again
    let fr = String::from("sdfs");
    {
        fr;
        s = fr; // ownership of fr is moved to s
    }
    //println!("{}", fr); // this will give an error because fr is out of scope
    //when scope ends fr will be dropped and memory will be freed

    //jst like a function which takes up an input fn(x: i32) -> i32 { x + 1}
    //the input is dropped after the fn svope
    fn takes_ownership(g: String) {
        println!("{}", g);
    } // g is dropped here

    //ownership doesnt move for types that implement the Copy trait
    //it jst copies the value
    let x = 5;
    let y = x; // ownership of x is copied to y // both x and y can be used
    println!("x = {}, y = {}", x, y);

    //but strings doqnt implement the Copy trait
    let s = String::from("hello");
    let s1 = s; // ownership of s is moved to s1
                //println!("{}", s); // this will give an error because ownership has been moved to s1
    println!("{}", s1);
}
