#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

struct Point3D(i32, i32, i32);
//just like tuples

//empty stuct
struct AlwaysEqual;

fn main() {
    let p = Point3D(2, 4, 6);
    p.0;

    let p2 = Point { x: 10, y: 20 };
    println!(":?", p2);
}
