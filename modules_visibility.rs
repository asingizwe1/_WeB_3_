// Declare a module named `library`
mod library {
    // Nested module `books`
    pub mod books {
        pub fn add_book() {
            println!("Book added to the library.");
        }

        fn remove_book() {
            println!("Book removed from the library.");
        }

        // A nested module inside `books`
        pub mod fiction {
            pub fn read_fiction() {
                println!("Reading a fiction book.");
            }
        }
    }

    // Another nested module `members`
    mod members {
        pub fn add_member() {
            println!("New member added.");
        }
    }

    // Public function in the `library` module
    pub fn library_info() {
        println!("Welcome to the library!");
    }
}

// Bring functions into scope using absolute and relative paths
fn main() {
    // Using absolute path
    crate::library::library_info();

    // Using absolute path to call public function in nested module
    crate::library::books::add_book();

    // Using relative path to call public function
    library::books::fiction::read_fiction();

    // The following lines will not compile if uncommented
    // because they try to access private items:

    // crate::library::books::remove_book(); // private
    // crate::library::members::add_member(); // private
}
