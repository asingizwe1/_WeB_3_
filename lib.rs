pub fn eq(x: char, y: char) -> bool {
    if x == y {
        true
    } else {
        false
    }
}

pub fn add(x: f32, y: f32, z: f32) -> f32 {
    x + y + z
}

pub fn cast(x: u8, y: i8, z: f32) -> f32 {
    x as f32 + y as f32 + z
}
