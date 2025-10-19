struct Point {
    x: i32,
    y: i32,
}
//1 STATIC METHODS
//STATIC METHODS DONT TAKE SELF PARAMETER
//2 INSTANCE METHODS
//TAKE SELF, &SELF OR &MUT SELF AS FIRST PARAMETER

//start with impl key work then the type you want to implement
impl Point {
    //functions that operate on a type are called static methods
    //It belongs to the type itself (Point), not to any object/instance of that type.
    fn new(x: i32, y: i32) -> Self {
        Self { x, y }
    }

    //we use self when we want to consume object ie to drop it

    fn move_to(&mut self, x: i32, y: i32) {
        self.x = x;
        self.y = y;
    }
}

fn main() {
    let q = Point { x: 10, y: 20 };

    let mut p = Point::new(10, 20);
}
