fn main() {
    let vals: Vec<u32> = vec![10, 20, 30, 40, 50];

    // Example 1: map each &u32 -> u32 (add 1)
    let v_added: Vec<u32> = vals.iter().map(|x| *x + 1).collect();
    println!("v_added: {:?}", v_added);

    // Example 2: map into a tuple (String, u32)
    // Use Vec<(String, u32)> and return a tuple from the closure.
    let v_tuple: Vec<(String, u32)> = vals.iter().map(|v| (v.to_string(), *v + 1)).collect();
    println!("v_tuple: {:?}", v_tuple);

    // Example 3: filter then map then collect (made values meaningful for filter)
    let vals1: Vec<u32> = vec![1, 2, 3, 4, 5];
    let v: Vec<u32> = vals1
        .iter()
        .filter(|&&x| x <= 3) // destructure the &&u32 into u32
        .map(|&x| x + 1) // &u32 -> u32
        .collect();
    println!("filtered+mapped: {:?}", v);
}
