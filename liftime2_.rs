//TELL RUST COMPILER THAT RETURN VALUE WILL BE VALID IF X AND Y ARE VALID
//life time being returned ' &'a str ' will be valid as long as both x and y are valid
fn longest_str<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
//when we deal with references its always sfarer to use lifetimes
struct Book<'a> {
    Title: &'a str,
}

//in the impl clock we put methods for the struct
impl<'a> Book<'a> {
    //tells rust that book has a reference that has a lifetime of a
    fn edit(&mut self, new_title: &'a str) {
        self.Title = new_title;
    }
}

//you can also declare several lifetimes
fn print_refs<'a, 'b>(x: &'a str, y: &'b str) {
    println!("x is {} and y is {}", x, y);
}

// AT THE END OF SCOPE ALL REFERENCES MUST BE VALID
fn main() {
    let x = "Trustii".to_string();
    let y = "Rust".to_string();
    let c = {
        //this will cause an error since y will be dropped at the end of this inner scope
        //  let y = "Rust".to_string();
        longest_str(&x, &y)
        //y is dropped here
    };
    println!("Longest string is {}", c);

    //static lifetime-valid throughout the programq
    let s: &'static str = "I have a static lifetime"; //creates a string slice whose lifetime valid through out program

    let s: &'_ str = "i have an elided lifetime";
    //tels rust to infer the lifetime
}
