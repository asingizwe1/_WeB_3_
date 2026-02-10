fn main() {
    //rust doesnt have garbange collector so lifetime tells compiler how long reference is valid
    //you dont borrow memory that doesnt exist
    /*
        you can think of alife time just like an electron which has + and -
    knowing how borrow checker works in detail

        */
    fn example_1() {
        let r; //r lives longer than x
        {
            //since r points to x that means that this is invalid code
            let x = 42;
            //x isnt a reference so it doesnt have a lifetime
            r = &x; //we create a reference to x on the inner scope
                    //the bar checker will say that x doesnt live long enough
        } //r crosses inner bracket where r goes out of scope
        println!("{}", *r); // and try to use it in the outer scope
    }

    fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
        //function takes 2 strings that stay some where in the memory 'a and functions returns reference to 'a
        //take - take a('a) to be a region in memory, not necessarily contiguous
        if s1.len() > s2.len() {
            return s1;
        } else {
            return s2;
        }

        let x: &'x str = "hi"; //each have their independent region containing the string
        let y: &'y str = "hello";
        let c: &'c str = "hey";

        let l1: &'l1 str = longest(x, y); //l1 is initialised with a call to longest using x and y
        let l2: &'l2 str = longest(l1, z);
    }

    //for a call to longest we may assume all refrences invloved need to have same region
    //call to longest creats a small region such taht both inputs to a function are contained innit
    //'l will contain 'x and 'y -> a new region 'l2 containing 'l1,'x,'y,'z for the case of the 2nd call to longest using l1 and z

    //WE MAY REQUIRE
    //a lifetime to otlive the other
    fn foo<'a, 'b>(a: &'a i32, b: &'b i32)
    where
        'a: 'b, //take a in take b
    {
    }
    //using input and output lifetimes
    fn longest<'s1, 's2, 'out>(s1: &'s1 str, s2: &'s2 str) -> &'out str
    where
        's1: 'out,
        's2: 'out,
    {
        if s1.len() > s2.len() {
            return s1;
        } else {
            return s2;
        }
    }
    //we have to tell compiler that both input regions must be contained in the output region 'out['s1,'s2] - so that we can return any of the input references
    //outlive is just a subset constraint
}
//when you remove the print the lifetime of r is jst on the line initializing

/*
struct Foo<a',b'>

   fn example_2() {
        let foo=69;
         let mut r;
        {
            let x = 42;
            r = &x;               'r={&x}
            println!("{}"*r)
        }                   there is a hole in lifetime of r since it isnt live here ..its value cant be used here

if random_bool(){
        r=&foo;         'r={&x,&foo} - now the life time of r is nolonger split
        because if the brach wasnt executed r still points to x
}

        println!("{}", *r);
    }


*/
//lifetimes are computed using a concept called liveness
//a variable is live if its current value
// may be used later in the program
