//you need lightweight, inline, and flexible function behavior

//You can use closures to filter, map, or transform blockchain transactions dynamically.
//Example: Filtering transactions based on custom logic before processing them.

//Closures are small, anonymous functions that you can store in a variable or pass around.
// They are like normal functions but can "capture" variables from their surroundings.
fn main(){
//add_one is a closure that takes x and retruns x+1
let add_one = |x| x+1;
println!("{}",add_one(5));
}