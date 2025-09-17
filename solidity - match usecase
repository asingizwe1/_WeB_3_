//match helps us execute code depending on the value that was matched
fn main() {
    let x = 1;
    //to match the value and execute a conditional statement, you start with key word match
    match x {
        //write conditional here
        1 => println1("one"),
        2 => println!("two"),
        // we need to match for all
        //we use a wild car
        _ => println!("anything"),
    }

    match x {
        //write conditional here
        1 | 2 => println1("one or two"),
        // we need to match for all
        //we use a wild car
        _ => println!("anything"),
    }

    //to match a range of numbers
    match x {
        //write conditional here
        //when you say 1..10 -> you exclude 10
        1..=10 => println1("one or ten"),
        //here the values will be matche dform 1 to 10
        // we need to match for all
        //we use a wild car
        _ => println!("anything"),
    }

    //to know which specifi number has been matched
    match x {
        //write conditional here
        //when you say 1..10 -> you exclude 10
        i @ 1..=10 => println("{i}"),
        //here the values will be matche dform 1 to 10
        // we need to match for all
        //we use a wild car
        _ => println!("anything"),
    }
    //option enum
    let x: option<i32> = Some(5);
    match x {
        //there are 2 values for n enum
        Some(i) => println("matched {i}"),
        None => println("not matched"),
    }

    // for result it returns 2 when its the ok case or when there is an error
    let x: result<i32, String> = Ok(5);

    match x {
        //2 cases ok with something inside or error with something inside
        Ok(i) => println("matched {i}"),
        Err(e) => println("not matched {e}"),
    }

    //match values can be used to return a value

    let z: Option<i32> = Some(123);
    let v: i32 = match x {};
}
