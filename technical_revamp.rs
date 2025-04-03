use std::io;

fn main() {
    let mut input = String::new();
    println!("Enter a number (positive, negative, or zero):");

    // Read user input and handle potential errors
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let y: i32 = match input.trim().parse() {
        Ok(num) => num,
        Err(_) => {
            println!("Invalid input. Please enter a valid number.");
            return; // Exit if input is not a number
        }
    };

    // Using match instead of if-else for better readability
    match y {
        0 => println!("y is zero, exiting."),
        n if n < 0 => println!("y is negative, exiting."),
        _ => {
            println!("y is positive, continuing.");
            println!("Processing with y = {}", y);
        }
    }

    // Using `while` with a break condition
    let mut x = 1; // Start at 1 to avoid division by zero
    while x < 100 {
        if x % 10 == 0 {
            println!("x is now a multiple of 10: {}", x);
            break; // Exit loop early
        }
        x *= 2; // Exponential growth
    }

    // Using `for` loop with `continue` to skip even numbers
    println!("Looping from 1 to 10, skipping even numbers:");
    for num in 1..=10 {
        if num % 2 == 0 {
            continue; // Skip even numbers
        }
        println!("Odd number: {}", num);
    }
}
