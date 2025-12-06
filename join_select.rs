use std::tokio::Duration;
use tokio::{join, select};

//join! -> give me all the results

//select! -> give me the result that returns earliest

async fn make(val: &'static str, dt: u64) -> &'static str {
    //returns string literal passsed
    tokio::time::sleep(Duration::from_millis(dt)).await;
    val
}

#[tokio::main]
async fn main() {
    let (res1, res2) = join!(
        make("tea", 2000), //ie tea takes 2000mn to make
        make("water", 1000)
    ); //join macro will return both results are both are done executing concurrently

    let res = select! {// the first one to be completed we will execute the code further
        val=make("tea", 2000)=>{
    println!("got {}",val);

        }, //once we get val we specify what we want to do with it
        //ie tea takes 2000mn to make
       val1=make("caa", 2100)=>{
    println!("got {}",val1);}};
}
