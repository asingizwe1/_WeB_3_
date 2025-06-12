//relative path starts from the current module. You use it to access sibling or parent modules using super or the module name directly.
mod greetings {
    pub fn hello() {
        println!("Hello world!");
    }
}
fn main() {
    ////////////////absolute path
    ///absolute path starts from the crate root (like the main lib.rs or main.rs). It starts with crate::/
    crate::greetings::hello(); // absolute path from crate root

    /// ////////
    ///below is relative
    mod outer {
        pub mod inner {
            pub fn greet() {
                println!("Hello from inner!");
            }
        }
    }

    pub fn call_inner() {
        super::outer::inner::greet(); // absolute path
        inner::greet(); // relative path (from outer)
    }
}
