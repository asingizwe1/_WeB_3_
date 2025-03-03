struct Dog {
    name: String,
    age: i8,
    }
    struct Cat {
    lives: i8,
    }
    trait Pet {
    fn talk(&self)-> String;
    }
    impl Pet for Dog {
    fn talk(&self)-> String {
    format!("Woof, my name is {}!", self.name)
    }
    }
    impl Pet for Cat {
    fn talk(&self)-> String {
        String::from("Miau!")
 }
 }
 fn main(){
 let pets: Vec<Box<dyn Pet>>= vec![
 Box::new(Cat{lives: 9}),
 Box::new(Dog{name:String::from("Fido"),age:5}),
 ];
 for pet in pets {
 println!("Hello,whoareyou?{}",pet.talk());
 }

// Compare these outputs in the above example:
 println!("{} {}", std::mem::size_of::<Dog>(), std::mem::size_of::<Cat>());
 println!("{} {}", std::mem::size_of::<&Dog>(), std::mem::size_of::<&Cat>());
 println!("{}", std::mem::size_of::<&dyn Pet>());
 println!("{}", std::mem::size_of::<Box<dyn Pet>>())
 }