struct Tomato;
struct Lettuce;
struct Cheese;
struct Patty;
struct Bun;

struct Burger {
    tomato: Tomato,
    lettuce: Lettuce,
    cheese: Cheese,
    patty: Patty,
    bun: Bun,
}

async fn toast_bun(bun: &Bun) {
    // toasting logic here
    println!("Toasting the bun!");
}

async fn cook_patty(patty: &Patty) {
    // cooking logic here
    println!("Cooking the patty!");
}

async fn get_cheese() -> Cheese {
    // logic to get veggies
    println!("Getting tomato and lettuce!");
    (Tomato, Lettuce)
}

//to run aync code we install a library in cargo.toml called tokio
//[dependencies]
//tokio= {version="1", features=["full"]}
async fn make_hamburger_seq() -> Hamburger {
    //to get values of async function we need to call awai
    let bun = toast_bun().await; //await means that the value isnt available but it will return that value in the future
    let patty = cook_patty().await;
    let (tomato, lettuce) = get_veggies().await;
    let cheese = get_cheese().await;

    println!("Assembling the burger!");
    Hamburger {
        tomato,
        lettuce,
        cheese,
        patty,
        bun,
    }
}

async fn make_hamburger() -> Hamburger {
    //to execute functiona concurrently we use a macro tokio::join

    //this macro will executes these instructions concurrently
    let (bun, patty, (tomato, lettuce), cheese) = tokio::join!(
        //it will return the results in a tuple
        toast_bun(), //await means that the value isnt available but it will return that value in the future
        cook_patty(),
        get_veggies(),
        get_cheese()
    ); //once all the methods are run.. it will get all ingredients necessary to make burger
       //and they are put in the hanmburger struct

    //to get values of async function we need to call awai

    println!("Assembling the burger!");
    Hamburger {
        tomato,
        lettuce,
        cheese,
        patty,
        bun,
    }
}

//ypu can cook burger quicker using async and await syntax

//you first declare async run time
#[tokio::main] //this will delclare the tokio runtime
async fn main() {
    //we declare main function as async
    make_hamburger_seq().await;
    make_hamburger().await;
}
