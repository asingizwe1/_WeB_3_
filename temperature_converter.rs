use std::io;

fn main(){
loop{
println!("Please select the temp type");
println!("1. Fahrenheit to celsius");
println!("2. Celsius to fahrenheit");
let mut conversion = String::new();
io::stdin().read_line(&mut conversion).expect("Failed to read line");
let conversion=conversion.trim();
let conversion = match conversion{
"1"=>1,
"2"=>2,
_=>{println!("please input 1 or 2");
continue;
}
};

println!("please input the temperature");
let mut temp=String::new();
io::stdin().read_line(&mut temp).expect("failed to read line");
    let temp:f64=match temp.trim().parse(){
Ok(num)=>num,
Err(_)=>{
println!("please input a valid temp");
continue;}
};
let convert=if conversion==1{   (temp - 32.) / 1.8
} else {
    temp * 1.8 + 32.
};

println!("the converted temp is {}",convert);
    }

}


