trait Summary{
fn summarize()-> string ;

}

struct Book;
impl Summary for Book{
fn Summary()->string{
string::from("summary achieved");
}

}
//T:Summary- must implement summary trait
fn verify<T:Summary>(key:&T){
println!("{}",key.Summary());

}

fn main(){
let book = Book;
verify(book);
}