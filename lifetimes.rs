//all parameters with a reference get their own lifetime
//jst to prevent dangling references
struct  Transaction<'a>{
sender: &'a str,
receiver:&'a str,
amount:f64,
}

struct Signature<'a>{
    signer: &'a str,
    signature: &'a [u8],// Reference to a cryptographic signature
}
//Ensures the Transaction struct references valid string slices (&str) and prevents dangling references.
fn main(){
fn process<'a> (tx: &'a Transaction){
println!("{} , {}",tx.sender,tx.receiver);
}

fn verify<'a> (ver:&'a Signature)->bool{
    println!("{:?}",ver.signature);
    return true;
}

}