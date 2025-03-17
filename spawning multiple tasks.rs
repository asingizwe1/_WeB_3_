use tokio::{task, join};

#[tokio::main]
async fn main() {
    let task1 = task::spawn(async {
        "Task 1 finished"
    });

    let task2 = task::spawn(async {
        "Task 2 finished"
    });
//join! lets you run multiple tasks at the same time and wait for all of them to finish before moving on.
    let (res1, res2) = join!(task1, task2);
    
    println!("{:?}, {:?}", res1.unwrap(), res2.unwrap());
}
/*
Detaching Tasks
If you want a task to run independently, you can detach it using tokio::spawn without awaiting it:

rust
Copy code
task::spawn(async {
    println!("This task runs independently.");
});
*/