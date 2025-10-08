fn f1() -> Result<u32, String> {
    // Simulate success
    Ok(10)
}

fn f2() -> Result<u32, String> {
    // Simulate success
    Ok(20)
}

//QUESTION OPERATOR MAKES CODE SHORTER WHEN RETURNING A RESULT
fn f1_f2_question() -> Result<u32, String> {
    let out_1_ = f1()?; //incase of an error this will end there and return error
                        //you dont need to do pattern matching when you call function with a "?""
                        //let out_1 = match f1() {
                        //Ok(num) => num,
                        //  Err(_) => return Err("error from f1".to_string()),
                        //};

    let out_2_ = f2()?; //incase of an error this will end there and return error
                        //you dont need to do pattern matching when you call function with a "?""
                        //let out_2 = match f2() {
                        //Ok(num) => num,
                        //  Err(_) => return Err("error from f2".to_string()),
                        //};
                        //APPENDING QUESTION MARK IS MATCH SHORTER AND FASTER THAN USING MATCH
    Ok(out_1_ + out_2_)
}

fn main() {
    let res = f1_f2_question();
    println!("Result using res: {:?}", res);

    //match f1_f2_question() {
    //  Ok(sum) => println!("Sum is: {}", sum),
    // Err(e) => println!("Failed: {}", e),
    //}
}
