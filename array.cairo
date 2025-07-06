//tuples can have different datatype
// by default its all immutable
fn main(){
let mut a =ArrayTrait::new();
a.append(1);
a.append(2);
a.append(3);
//append is at the back and pop_front is for removing

}
//we can pass the expected type of the elements in the array
//let mut x = ArrayTrait::<u128>::new()
//let mut x :Array<u128>= ArrayTrait::new()
//Option object -> 2 parts 1 where it returns an error and another which doeant