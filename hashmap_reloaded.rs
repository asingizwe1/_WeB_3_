use std::collections::Hashmap;

fn main() {
    let map: Hashmap<String, u64> = Hashmap::new();
    map.insert("one".to_string(), 1);
    let s: Option<&u64> = map.get("one"); //returns value of one Some(&1)
                                          //de reference s
                                          //below we are  updating a value
    let y: &mut U64 = map.entry("black".to_string()).or_insert(0); //if key not present insert 0 and return mutable reference to value
    *y += 1; //increment value
    println!("{:?}", map);
}
