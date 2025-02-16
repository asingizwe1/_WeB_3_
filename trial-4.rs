use std::syn::mutex;
fn main(){
let mut cord=(3,6);
let g=&mut cord.1;
*g=56;
println!("{:?}",cord);
// mutex-lock for your data
//mutex prevents multiple tasks from accessing data at the same time its like a lock
//static variables need synchronisation using a mutex for safety


//below basically we have 2 events trying to access and modify thre same data
let data =mutex::new(0);
//shared data is locked in the mutex
{let mut locked_data=data.lock().unwrap;//lock mutex to access data
    *locked_data +=1;//safely modified data;
}//mutex unlocks when variable is out of scope
println!("{}",*data.lock().unwrap());
//data.lock()-lock again to read the value.
}
//static accessible anywhere in the program