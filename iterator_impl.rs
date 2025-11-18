fn main() {
    let nums = vec![256700123456u64, 256700987654];

    let formatted: Vec<String> = nums
        .iter()
        .map(|n| format!("+{} {} {}", &n.to_string()[0..3], &n.to_string()[3..6], &n.to_string()[6..]))
        .collect();

    println!("{:?}", formatted);
}
