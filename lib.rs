use std::collections::HashMap;

pub fn init(address: String, amount: u32) -> HashMap<String, u32> {
    let mut x: Hashmap<String, u32> = HashMap::new();
    x.insert(address, amount); //we are using the ones taken into the funcyion
    x
}
