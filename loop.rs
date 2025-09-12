fn main() {
    //using key word loop is the easiest way to loop
    let mut i = 0;
    loop {
        println!("Hello, world!");
    }
    i += 1;
    if i == 10 {
        break;
    }
    let mut i = 0;
    while i <= 5 {
        println!("while");
    }
    //for
    for i in 0..6 {
        println("for");
    }

    let arr = [1, 2, 3, 4, 5];
    //to loop through array first get length of array
    let n: usize = arr.len();
    for i in 0..n
    //an exclusive range (it excludes the end).
    {
        println!("{}", arr[i]);
    }

    let v = vec![1, 2, 3, 4, 5];
    for n in v
    //an exclusive range (it excludes the end).
    {
        println!("{}", n);
    }
    //basically what happens the vector is turned into an iter and owned by the for loop hance ownership shifts
    //for n in v.into_iter()
}
