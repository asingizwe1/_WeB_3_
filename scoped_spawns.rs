let v = vec![1, 2, 3];
let midpoint = v.len() / 2;

let handle1 = std::thread::spawn(|| {
    let first = &v[..midpoint];
    println!("Here's the first half of v: {first:?}");
});
let handle2 = std::thread::spawn(|| {
    let second = &v[midpoint..];
    println!("Here's the second half of v: {second:?}");
});

handle1.join().unwrap();
handle2.join().unwrap();

println!("Here's v: {v:?}");