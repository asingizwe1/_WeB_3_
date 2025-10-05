#[derive(Debug, PartialEq)]
pub enum MathError {
    DivByZero,
}

pub fn div(x: u32, y: u32) -> Result<u32, MathError> {
    if y == 0 {
        MathError::DivByZero
    } else {
        x / y
    }
}

pub fn get(v: &[u32], i: usize, default_val: u32) -> u32 {
    if i<v.len(){
        v[i]
    }else{
        default_val
    }
}
