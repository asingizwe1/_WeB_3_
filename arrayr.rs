//slice - array whose size isnt known at compile time
fn main() {
    let arr: [u32; 3] = [1, 2, 3];
    //It tells the compiler that arr is an array of u32 (unsigned 32-bit integers), and the array has exactly 3 elements.
    println!("{:?}", arr);

    let arr: [u32; 5] = [0; 10];
    //tells rust that all elements of the array should be initialized to 0
    println!("{:?}", arr);

    let nums: [u32; 5] = [1, 2, 3, 4, 5];
    //Accessing elements of an array using indexing
    let s: &[i32] = &nums[1..3]; //slice of nums thats why we say type &[i32]    //This creates a slice that includes elements from index 1 to index 3 (exclusive).
}
