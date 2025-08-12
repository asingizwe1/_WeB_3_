pub fn first(t: (bool, u32, char)) -> bool {
    println!("{}", t.0);
}

pub fn last(t: (bool, u32, char)) -> char {
    println!("{}", t.2);
}

pub fn swap(t: (u32, u32)) -> (u32, u32) {
    let (a, b) = t;
    println!("({}, {})", b, a);
    (b, a)
}
