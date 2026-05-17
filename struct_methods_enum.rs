fn main() {
    /*
    structs- store data
    methods-functions attached to structs
    functions returning structs - create and return objects
    enums - represent different possible states

    */
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }
    struct Person {
        name: String,
        age: i32,
    }
    //we go to methods which are a function attached to a a struct
    impl Person {
        //impl block is for implementing fucntionality of a sruct
        fn greet(&self) {
            //&self is for immutable but & mut self is for mutable
            println!("{}", self.name);
        }
    }

    fn create_person() -> Person {
        //if it is to return a struct then in the function body we must have the struct implementation
        Person {
            name: String::from("Alice"),
            age: 25,
        }
    }

    //let var=Struct{with exact parameters}
    let person = Person {
        name: String::from("Louis"),
        age: 23,
    };
    person.greet();

    //we dont use the new key word we jsut equate
    let r = create_person();
    println!("{}", r.name);
    let move_player = Direction::Left;
    //we use :: to access member in enum
    match move_player {
        Direction::Up => println!("Going up"),
        Direction::Down => println!("Going down"),
        Direction::Left => println!("Going left"),
        Direction::Right => println!("Going right"),
    }
}
