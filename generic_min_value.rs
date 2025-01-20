//you will implement a generic min function that determines the minimumoftwovalues, using the Ord trait.
use std::cmp::Ordering;


//the type should implement Ord trait 
fn min<T: Ord>(x:T,y:T)-> T
{//we use match when ordering
match x.cmp(&y){//key => value
//cmp compares x and y and retruns an odering enum
Ordering::Less | Ordering::Equal => x,
Ordering::Greater => y,
}
//match used to handle all possible cases of Ordering

}

fn main() {
    assert_eq!(min(0,10),0);
    assert_eq!(min(500, 123), 123);
    assert_eq!(min('a', 'z'), 'a');
    assert_eq!(min('7', '1'), '1');
    assert_eq!(min("hello", "goodbye"), "goodbye");
    assert_eq!(min("bat", "armadillo"), "armadillo");
    }