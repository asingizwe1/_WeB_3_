//into_iter() and iter()-both produce iterator

//data type that implements iterator trait can be iterated

//when datatype implements iterator trait you will be able to loop through

//iter_mut-mut &T - will give you back the mutable reference to value being iterated
//iter()- &T-produces iterator that for each iteration will give you back the reference to value being iterated
//into_iter() - outputs iterator where each type is of type T

for v:u32 in vals.into_iter(){
    //fn into_iter transfers ownershio into that for-loop
///once we call for loop we cant call into_iter again since it transfered ownership to for loop

}


for v:u32 in vals.iter(){
    //after calling for loop we can call it again since we are using  a reference
    //same applies for iter_mut

    
}
