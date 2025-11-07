//trait bound is a way to tell a compiler theat a type implements a particular trai
//trait bound suitable for generics

//PartialOrd-> helps to compare the types that can be ordered
//basically its for anytypes that can be compared
//because since its generic compiler cant be sure if the type supports comparison or not
//max<T: PartialOrd>-> this is an example  of a trait bound.. basically that the type will implement some other trait
fn max<T: PartialOrd>(x: T, y: T) -> T {
    if x <= y {
        x
    } else {
        y
    }
}
//you get errors if the type you pass doesnt implement that trait
trait A {}
trait B {}
trait C {}

impl A for u32 {}
impl B for u32 {}
impl C for u32 {}

fn ab<T: A + B>(X: T) {}

fn main() {
    let u: u32 = 1;
    let i: u32 = -1;
    a(u);
    //input in ab must implement both traits A and B
    ab(u);
}
