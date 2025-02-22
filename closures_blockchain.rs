//Filtering Transactions (Like Sorting Money)
//Imagine you have a list of transactions, but you only want to process the big ones (above 100 coins)
// Instead of writing a long function, you can use a closure.
fn main(){
let transactions= vec![50, 150, 200, 75, 300];
//into_iter->consumes the transactions vector and converts it into an iterator.
//means transactions can no longer be used after this operation (ownership is moved).
//filter() is an iterator method that keeps only elements that satisfy a condition.
//collect() transforms the iterator back into a Vec<i32>.
//&x means we borrow x before comparing
let big_transactions: Vec<i32> = transactions.into_iter().filter(|&x| x > 100).collect();
println!("{:?}", big_transactions); // Output: [150, 200, 300]


}