fn parse(s: &str) -> Result<u32, String> {
    match s.parse() {
        Ok(val) => Ok(val),
        Err(_) => Err("Failed to parse string into u32".to_string()),
    }
}

pub fn sum(nums: &[&str]) -> Result<u32, String> {
    //parse(nums)?; -> not valid alone
    //&[&str]->list like structure of a string of slices
    //while parse(x) -> expects one parameter

    let mut total = 0;
    for n in nums {
        total += parse(n)?; //if parse returns an error the function will return the error
    }
    Ok(total) //if all parsing is successful return total
}
