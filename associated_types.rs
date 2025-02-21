//trait that has an associated type
trait Mytrait{
type Mytype;
fn get_my_type()->Self::Mytype; 
}
trait Payment {
    type Currency;  // Associated type for the currency type

    fn pay(&self, amount: u64, recipient: &str) -> Self::Currency;
}
fn main(){
struct MyStruct{}
//we have to give associated type Mytype a concrete type when implementing the trait
impl Mytrait for MyStruct{
type Mytype =i32;
fn get_my_type()->Self::Mytype{
return 42;
} }

trait Payment {
    type Currency;  // Associated type for the currency type

    fn pay(&self, amount: u64, recipient: &str) -> Self::Currency;
}



}