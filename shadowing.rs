fn rpt(){
    
        let mut x = 5;
        println!("functions sake: {}",x);
           
        {
         x =x*2;
        println!("within: {}",x);
        }
        println!("after: {}",x);
        
}

fn main(){
let x = 5;
println!("before: {}",x);

{
let x =x*2;
println!("within: {}",x);
}
println!("after: {}",x);

rpt();
}