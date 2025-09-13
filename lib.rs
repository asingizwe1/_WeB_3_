pub fn sum(nums: Vec<i32>) -> i32 {
    let v = vec![1, 2, 3];
    let mut sum = 0;
    //basically for i ->  the i is for each element in the vector
    for i in v.iter() {
        sum += i;
    }
}

pub fn fill(i: u32, n: usize) -> Vec<u32> {
    //return a vector of length n filled with letter i
    vec![i; n] //vector of length n filled with letter i
}
