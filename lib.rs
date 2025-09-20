pub fn unwrap_or_default(x: Option<u32>, v: u32) -> u32 {
    if let Some(value) = x {
        value
    } else {
        v
    }
}
/*pub fn unwrap_or_default(x: Option<u32>, v: u32) -> u32 {
    todo!();
}
Use the if, let syntax to extract the value stored inside a Some.

Return the inner value.

If x is None, then return the default value v. */
