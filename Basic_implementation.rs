fn main(){
    //PATTERN MATCHING
    //ignoring some values
struct SemVer(i32, i32, i32);
let version = SemVer(1, 32, 2);
match version {
   SemVer(major, _, _) => {
       println!("{}", major);
   }
}
let numbers = (2, 4, 8, 16, 32);
match numbers {
   (first, .., last) => {
       println!("{}, {}", first, last);
   }
}

let num = Some(4);
 match num {
//if num is some(x) amd x<5 return whats given
    Some(x) if x < 5 => println!("less than five: {}", x),
    Some(x) => println!("{}", x),
    None => (),
 }
//@bindings
//@ - allows us to capture a value while also checking a condition(like a range)
//basically you save a value into a variable and apply a pattern to it at the same time
struct User {
    id: i32
 }
 let user = User { id: 5 };
 //we use match to check the value of user id
 match user {
    User {
        //checks if id is btn 3 and 7
        //if true it captures id into id_variable
        id: id_variable @ 3..=7,
    } => println!("id: {}", id_variable),
    User { id: 10..=12 } => {
        println!("within range");
    },
    User { id } => println!("id: {}", id),
 }

}