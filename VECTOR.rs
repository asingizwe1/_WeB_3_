fn main() {
    let mut v: Vec<i32> = Vec::new();
    //let mut y:Vec<u32>= Vex::new();
    v.push(1);

    //we use the vec macro to initialise a vec with elements
    let v = vec![1, 2, 3]; //by default its of type Vec<i32>
                           //if you wanted to say a certain number was of a certian type
    let v = vec![1u32, 2, 3]; //now its of type Vec<u32>
                              //1 will be of type u32 and the rest will be Vec<i32>
    let v1 = vec![0u32; 100]; //gives you 100 zero's of type u32
                              //pop methods
                              //return on Option..some(i32)
                              //..None
                              //we can create a slice from a vector

    let v = vec![1, 2, 3, 4, 5];
    let slice = &v[1..3]; //gives you a slice from index 1 to index 3 exclusive
    println!("{:?}", slice);
}
