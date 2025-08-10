//overflow doesnt panic when compiled with --release'
fn main(){
let mut x = u32::MAX; //MAX OF U32
X+= 1; // This will wrap around to 0
println!("x: {}", x);

}
//FUCNTIONS TO HANDLE OVERFLOWS AND UNDERFLOWS
//u32::checked_add ->return None on overflow
//u32::wrapping_add ->expilicitly allow overflow

//if something is correct its stored in a stoareg variable called some and if not and it has an error its stored in none