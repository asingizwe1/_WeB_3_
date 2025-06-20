//store different types that implement the same trait in one variable using a pointer (Box<dyn Trait>).
//dyn means "dynamic dispatch" (decide which method to run at runtime).

//so for owned trait we store different types that implement the same trait in one variable
//(Trait Object (Box<dyn Speak>)
trait Speak {
    fn speak(&self);
}

struct Dog;
struct Cat;

impl Speak for Dog {
    fn speak(&self) {
        println!("Woof!");
    }
}
impl Speak for Cat {
    fn speak(&self) {
        println!("Meow!");
    }
}

//Use a Trait Object (Box<dyn Speak>
fn make_animal(noise: &str) -> Box<dyn Speak> {
    if noise == "bark" {
        Box::new(Dog) // Dog is owned inside the Box
    } else {
        Box::new(Cat) // Cat is owned inside the Box
    }
}
fn main() {
    let pet: Box<dyn Speak> = make_animal("bark");
    pet.speak(); // Will print "Woof!"
}
