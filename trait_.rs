struct Solidity {
    version: String,
}

struct Vyper {
    version: String,
}

trait Compiler {
    //trait has abstract methods
    fn compile(&self, file_path: &str) -> String;
}

impl Compiler for Solidity {
    fn compile(&self, file_path: &str) -> String {
        format!("solc {}", file_path)
    }
}
impl Compiler for Vyper {
    fn compile(&self, file_path: &str) -> String {
        format!("vyper {}", file_path)
    }
}

// ? : tells rust the type implements a trait
//the size of a reference is known at compile time
//so it is wrong to say returns a type that implements Compiler
fn compile(lang: &impl Compiler, file_path: &str) -> String {
    lang.compile(file_path)
}

fn main() {
let sol = Solidity {
    version: "0.8.19".to_string(),  


}
let vyper = Vyper {
    version: "0.3.7".to_string(),


}
println!("sol compiler command: {}", compile(&sol, "contract.sol"));
println!("vyper compiler command: {}", compile(&vyper, "contract.vy"));

//or
println!("sol compiler command: {}", sol.compile("contract.sol"));
println!("vyper compiler command: {}", vy.compile( "contract.vy"));

}
