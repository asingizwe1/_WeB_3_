fn main() {
    let a = [1, 2, 3, 4, 5, 6];

    //iter -  gives you an iterator over immutable
    //references to elements
    //if you just want to look at the elements without taking
    //ownership,rust gives you references (&T)
    //so basically you will get references to all values of a
    //it JUST POINTS
    for x in a.iter() {
        println!("{}", x);
    }
    //  * -> IS USED TO ACCESS VALUE behind a a refernce
    let a = 'x';

    let r: &char = &a;

    println!("{}", *r);
} // but if you want to modify x as but like adding
  //then you use iter_mut()-> *x+=1 - you derefrence
