//pattern matching is done with match, if let and while let

fn main() {
    let number = 2;

    match number {
        1 => println!("one"),
        2 => println!("2"),
        _ => println!("nill"),
    }

    //matching enums
    enum Direction {
        Left,
        Right,
    }

    let move_to = Direction::Left;

    match move_to {
        Direction::Left => println!("valid"),
        Direction::Left => println!("invalid"),
    }
}
