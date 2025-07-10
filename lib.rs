pub fn zeros() -> [u32; 100] {
    //function returns a fixed size of 100 elements of type u32
    return [10; 100]; //shorthand for creating 100 elememts of type u32 with value 10
                      //no need for return becuase rust uses expression oriented code
}

pub fn first_3(s: &[u32]) -> &[u32] {
    &s[0..3] //returns a slice of the first 3 elements of the array
}

pub fn last_3(s: &[u32]) -> &[u32] {
    &s[s.len() - 3..] //returns a slice of the last 3 elements of the array
}
/*
let s = &[10, 20, 30, 40, 50];
let last_3 = &s[s.len() - 3..]; // Same as &s[2..]
println!("{:?}", last_3); // Output: [30, 40, 50]

*/
//&s - > pointer to a string
