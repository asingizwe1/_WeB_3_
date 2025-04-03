fn main(){
    let y=5;

    if y==0 {println!("y is zero, exiting.");}
else if y<0{
    println!("y is negative, exiting.");
} else {
    println!("y is positive, continuing.");
    // You can add more code here to continue processing if y > 0
}
//for while loop you first let your variable to be mutable
let mut x = 0;
while x<10 {
x=x/2;
println!("x:{}", x);

}

for x in 1..6 /*[1,2,3,4,5] */{
    println!("x: {}", x);

}
}
