struct Fib{
curr:u32,
next:u32,
}
//next() most important method in iterator trait
impl Iterator for Fib{
//define type of items the iterator will produce
type Item=u32;
fn next(&mut self)-> Option<Self::Item>{
//this method advances iterator and returns next value
let new_next =self.curr + self.next;
self.curr=self.next;
self.next=new_next;
Some(self.curr)}}

fn main(){
let fib =Fib{
    curr:0,
    next:1,
    };
//Vec<T> is just a collection; it stores elements, but it doesn’t "move" through them automatically.
//An iterator in Rust is an object that produces a sequence of values one at a time instead of giving you everything at once.
//enumerate method is used to iterate over an iterator, yielding a sequence of pairs
// useful when you need to keep track of the position of items during iteration
    for (i,n) in fib.enumerate().take(5){
println!("{},{}",i,n);


    }


}