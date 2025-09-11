pub fn min(x: i32, y: i32) -> i32 {
    if x < y {
        x
    } else {
        y
    }
}

pub fn max(x: i32, y: i32) -> i32 {
    if x > y {
        x //remember we dont put ; because we want to return it
    } else {
        y
    }
}

pub fn sign(x: i32) -> i32 {
    if x < 0 {
        -1
    } else {
        1
    }
}
