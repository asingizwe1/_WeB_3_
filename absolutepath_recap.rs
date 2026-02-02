//crate is the main file where
//rust starts building your program
mod garden {
    pub fn plant() {
        println!("plant trees");
    }
}
//crate:: -> use it to refer to modules
fn main() {
    crate::garden::plant(); //full address from crate root
                            //go to main directory(crate) then enter garden then run plant
}
