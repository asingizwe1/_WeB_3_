//modules are jst to organise data in rust
mod my {
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
        pub fn print() {
            println!("Hello from x module");
        }
        //we prefix it with pub
        pub struct S {
            pub x: i32,
            pub y: String,
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
}
