//modules are jst to organise data in rust
mod c {
    pub fn print() {
        println!("Hello from c module");
    }
}

mod my {
    use super::c; //tells rust to look for a module one above my
                  //if you dont prefix with pub  then function can only be called in module
    fn private_print() {
        println!("Hello from my module");
    }

    pub fn print() {
        println!("Hello from my module");
    }

    //nesting module in module
    //we must prefix it with mod if we want it to be accessible outside
    pub mod x {
        use super::c;
        //but if we hadnt called use super::c in the upper module
        //we would say use super::supper::c
        //the number of super depends on how deep you are in a given mod
        //one super means that the mod is one level deep
        pub fn print() {
            println!("Hello from x module");
        }
        //we prefix it with pub
        //both fields in struct must be public sothat you dont get an error
        pub struct S {
            pub x: i32,
            pub y: String,
        }
        //if you want to pass S without making y public you could use another function'

        pub fn build(x: i32) -> S {
            s {
                x,
                y: "".to_string(),
            }
        }
    }
}
fn main() {
    my::print();
    my::x::print();
    my::x::S {
        x: 12,
        y: "oppo".to_string(),
    };
    my::x::build(12); //even if y wasnt public we could still call build function
}
