
fn main() {
trait X {
fn sound(&self)-> String;
}

struct Y;


   
//impl trait for struct
    impl X for Y{
    fn sound(&self)-> String{
String::from("I am going to be a millionaire in the next 1 month") 
    }
   }
let y = Y;
println!("{}", y.sound());

}