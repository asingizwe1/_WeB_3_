// Define a struct
struct User {
    username: String,
    email: String,
    age: u8,
    active: bool,
}

// Associated functions & methods with `impl`
impl User {
    // Constructor
    fn new(username: &str, email: &str, age: u8) -> Self {
        User {
            username: username.to_string(),
            email: email.to_string(),
            age,
            active: true,
        }
    }

    // A method (takes &self)
    fn display(&self) {
        println!(
            "User: {} ({}), Age: {}, Active: {}",
            self.username, self.email, self.age, self.active
        );
    }

    // A mutable method (takes &mut self)
    fn deactivate(&mut self) {
        self.active = false;
    }
}

fn main() {
    // Create struct using constructor
    let mut user1 = User::new("louis", "louis@example.com", 22);
    user1.display();

    // Update a field
    user1.age = 23;
    user1.deactivate();
    user1.display();

    // Create struct directly (without constructor)
    let user2 = User {
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        age: 30,
        active: true,
    };
    user2.display();
}
