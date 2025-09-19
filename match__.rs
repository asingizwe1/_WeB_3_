enum Direction {
    North,
    South,
    East,
    West,
}

fn move_player(dir: Direction) {
    match dir {
        Direction::North => println!("Moving up"),
        Direction::South => println!("Moving down"),
        Direction::East  => println!("Moving right"),
        Direction::West  => println!("Moving left"),
    }
}

fn main() {
    move_player(Direction::East);
}
