use std::io;



struct BudgetManager{
income:f32,
expense:f32,
} 
//we implement the budget struct and assign it default values
//if you want to add methods(behavior to a struct) we use impl _struct
impl BudgetManager{
fn new()->Self{
Self { income: 0.0, expense: 0.0 }

}
//USE SELF INSIDE A METHOD THAT BELONGS TO A STRUCT
//&mut self → This means the function is called on a mutable instance of a struct.
//it doesnt need to return anything because changes are made to the struct
fn add_income(&mut self,amount:f32){
    //self.income += amount; → This updates the income field of the struct by adding the given amount.
    self.income+=amount;
    println!("income added ${}",amount);}
    
    fn add_expense(&mut self,amount:f32){
    self.expense+=amount;
    print!("expense added ${}",amount);}
    
    //this function is called on an instance of a struct
    fn view_budget(&self){
        let balance = self.income - self.expense;
        println!("Income: ${}", self.income);
            println!("Expenses: ${}", self.expense);
            println!("Balance: ${}", balance) 
    }
    
}

fn main() {
    let mut minibudget= BudgetManager{income:4.6,expense:2.4};
//The loop block in Rust creates an infinite loop until explicitly exited using break.
  loop {
    println!("Budget Manager");
    println!("1. Add Income");
    println!("2. Add Expense");
    println!("3. View Budget");
    println!("4. Exit");

    //creating a mutable string to store the user's input
let mut choice = String::new();
//This line is used in Rust to read user input from the command line
io::stdin().read_line(&mut choice).expect("Failed to read line");
//io::stdin()Gets standard input (keyboard input).
//.read_line(&mut choice)->Reads user input and stores it in choice.
//&mut choice->means we pass a mutable reference so the function can modify choice.
//.expect("Failed to read line")->Handles errors by crashing the program if input reading fails.
let choice:u32=match choice.trim().parse(){
Ok(num)=>num,
Err(_)=>continue,
};
      
match choice {
    1=>{
        println!("enter income amount:");
//Initializes amount as an empty string ("").
        let mut amount = String::new();
//We make it mutable (mut) because read_line() will modify it.
io::stdin().read_line(&mut amount).expect("Failed to read line");
//stdin() belongs to std::io, not io::std.
        //.trim() removes leading and trailing spaces (including \n from read_line())
        let amount:f32 = match amount.trim().parse(){
            //parse()Tries to convert the trimmed string into a u32 (parsing input).
Ok(num)=> num,//Ok(num)=> num ..If parsing succeeds, store the number in choice.
Err(_)=>continue,};
minibudget.add_income(amount);
//Err(_) => continue..If parsing fails, ignore the error and continue the loop (ask for input again).
    }
    2 => {
        println!("Enter the expense amount:");
        let mut amount = String::new();
        io::stdin().read_line(&mut amount).expect("Failed to read line");
        let amount: f32 = match amount.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };
        minibudget.add_expense(amount);

}
3 => {
    minibudget.view_budget();
}
4=>{
    print!("Exiting budget manager.");
    break;
}
_ =>{
    println!("imput a a valid choice");
}
  }

  }
}
