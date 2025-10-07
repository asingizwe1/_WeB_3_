pub fn parse_and_add(a: &str, b: &str) -> u32 {
    //parsing is converting from string to number
    let q = a.parse().expect("Failed to parse a");
    let w = b.parse().expect("Failed to parse variable");
    q + w
}

pub fn unwrap_and_add(x: Option<u32>, y: Option<u32>) -> u32 {
    x.unwrap() + y.unwrap()
}
