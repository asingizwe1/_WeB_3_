struct Person {
    name: String,
    age: u8,
}
//when you pass a variable.. ownership moves to the function
// so insimple terms if you passed J into this function
//you wouldnt be able to use it afterwards
fn describe(person: &Person) {
    //access through variable not TYPE
    println!("{} {}", person.age, person.name)
    // Person.age, Person.name)
}

fn main() {
    //if field names arent important you can use tuple struct
    struct Point(i32, i32);
    let mut J = Person {
        name: String::from("J"),
        age: 27,
    };
    describe(&J); //pass a reference because describe expects it
}
