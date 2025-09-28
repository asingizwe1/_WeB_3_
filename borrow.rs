fn main() {
    //borrow temporarily use a value without taking ownership
    //we create a reference to use the borroeing tule
    //immutable-readonly
    //mutable- only one mutable reference can be created
    ///for mutable we can only have one read and write access at a time
    /// for immutable its any number of read-only access to a value
    //references must not outlive the value
    let s = "xrp".to_string();
    let s1 = &s;
    let s2 = &s;
    let s3 = s2;
    //above is for immmutable reference - read only

    //MUTABLE BORROWS
    let s1 = &mut s;
    //so we can modify value of s
    s1.push_str("_is goint to pump");
}
