// In this exercise you will take a very simple data structure and make it generic
//It uses astd::collections::HashMap to keep track of which values have been seen and how many times each one has appeared.

use std::collections::HashMap;
use std::hash::Hash;
//the value is of must take up a key and its respective value
struct Counter<T>{values: HashMap<T,u64>}

//we then implement functionality ofCounter<T> struct
impl<T: Eq + Hash> Counter<T>{
//give a function that creates a new counter struct 
//returns the struct(Self) basically the struct
//Creates a new HashMap and wraps it in a Counter
fn new() -> Self{
    // :: to invoke method of a specific type
//copiler knows types of Hashmap::new() when its called so no need to make Counter generic
    Counter{values :HashMap::new() 
    }//Creates an empty HashMap and assigns it to values.

}
// Count an occurrence of the given value.
//&mut self allows you to mutate the fields of the struct
//it borrows the instance mutably for the duration of the method
fn count(&mut self, value:T){
    *self.values.entry(value).or_default() += 1;
/*self.values.entry(value):

Checks if the given value (key) exists in the HashMap.
If it exists, it gives you mutable access to its count (u64).
If it doesn’t exist, it creates a new entry with a default value (0).
++or_default():
Ensures that a new key is initialized with 0 if it’s not already in the HashMap */
}

/*
self.values.get(&value):

Looks up the count for the given key in the HashMap.
Returns an Option<&u64>:
Some(&count) if the key exists.
None if the key doesn’t exist.

.copied():
Converts the &u64 reference into a u64 value.

.unwrap_or_default():
If the key doesn’t exist (None), it returns the default value 0.
*/
fn times_seen(&self, value: T)-> u64 {
    self.values.get(&value).copied().unwrap_or_default()
    }
}

fn main(){
    let mut strctr = Counter::new();
    strctr.count("apple");
    strctr.count("orange");
    strctr.count("apple");
    println!("got {} apples", strctr.times_seen("apple"));

}

