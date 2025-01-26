fn main(){

    let mut k=String::from("opi");
    {let _y=&mut k;}//you can onlu use a mutable variable twice if one is in scope

    let _o=&mut k ;


    //pattern matching
    let key="x";
    match key{
"x"=> println!("cltch"),
"r"=> println!("cltoch"),
_ => println!(""),
    }

}