use std::io;

fn main(){
loop{
    println!("Simple Calculator");
    println!("1. Addition");
    println!("2. Subtraction");
    println!("3. Multiplication");
    println!("4. Division");
    println!("5. Exit");

    //create a new string
    let mut choice = String::new();
    io::stdin().read_line(&mut choice).expect("Failed to read line");
let choice:u32 = match choice.trim().parse(){
Ok(num)=>num,
Err(_)=>continue,
};

if choice == 5{
    println!("exiting calc");
    break;
}
println!("Enter the first number:");
let mut num1 = String::new();
io::stdin().read_line(&mut num1).expect("Failed to read line");
let num1: f64 = match num1.trim().parse() {
Ok(num)=>num,
Err(_)=>{
    println!("Invalid input. Please enter a valid number.");
    continue;
}
};

println!("Enter the second number:");
let mut num2 = String::new();
//read line takes up a mutable reference.
io::stdin().read_line(&mut num2).expect("Failed to read line");
let num2: f64 = match num2.trim().parse() {
    Ok(num) => num,
    Err(_) => {
        println!("Invalid input. Please enter a valid number.");
        continue;
    }
};

match choice{
1=>{let result = num1 + num2;
    println!("Result: {}", result);}
2=>{let result = num1 - num2;
    println!("Result: {}", result);}
3=>{let result = num1 * num2;
    println!("Result: {}", result);}
4=>{if num2!=0.0{
    let result = num1 / num2;
                    println!("Result: {}", result);       
}else{
println!("you cant divide by zero");

}
}
_ => {
        println!("Invalid choice. Please enter a number between 1 and 5.");
    }
}


}

}