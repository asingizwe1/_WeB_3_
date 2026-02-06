fn main() {
    //unwrap -> option will return inner value when its a SOME
    let x: Option<i32> = None;
    //option enum can have some value T or None
    let v = match x {
        //ownership od x moves into v
        Some(v) => v,
        None => panic!("doom"),
    };
    println("{}", v);
    //So when you call methods like .unwrap() or .expect(), you’re essentially saying: “I’m confident this Option has a value, give it to me directly.”
    // //you call unwrap and expect to get inner value of Option enum
    //you cant use x again because it has been consumed
    // let j = x.unwrap(); //extracts inner u32 from x
    // println("{}", j);
    // let k = x.expect("err"); //-> just like unwrap but allows you provide a custom error
    // println("{}", k);
}

// unwrap()
// Behavior: If the Option is Some(v), it returns v. else it panics

// let x = Some(10); println!("{}", x.unwrap()); // prints 10
// let y: Option<i32> = None; println!("{}", y.unwrap()); // panics!

// expect(msg)
// Behavior: Works exactly like unwrap(), but lets you provide a custom panic message.

// Option is None, it panics with your message instead of the default.

// let y: Option<i32> = None;
// println!("{}", y.expect("Expected a number here"));
// // panics with: "Expected a number here"
