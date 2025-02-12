/*
The Luhn algorithm is used to validate credit card numbers. 

The algorithm takes a string as
 input and does the following to validate the credit card number:
 • Ignore all spaces. Reject numbers with fewer than two digits.
 • Moving from right to left, double every second digit: for the number 1234, we double
 3 and1. For the number 98765, we double 6 and 8.
 • Afterdoublingadigit, sumthedigitsiftheresultisgreaterthan9. Sodoubling7becomes
 14 which becomes 1 + 4 = 5.
 • Sum all the undoubled and doubled digits.
 • Thecredit card number is valid if the sum ends with 0.

*/
/* 
pub fn Luhn(cc_number:&str)-> bool{
let mut sum =0;
let mut double =false;
//.chars() method converts a string slice (&str) into an iterator over its Unicode characters.
//The .rev() method reverses the order of an iterator.
for c in cc_number.chars().rev(){

if let Some(digit)=c.to_digit(10){
    if double {
        let double_digit = digit * 2;
        sum +=
        if double_digit > 9 { double_digit- 9 } else { double_digit };
        } else {
        sum += digit;
        }
        double = !double;
        } else {
        continue;
        }
}
sum % 10 == 0
}
*/
 // This is the solution and passes all of the tests below.
 pub fn luhn(cc_number: &str)-> bool {
    let mut sum = 0;
    let mut double = false;
    let mut digits = 0;
//.to_digit(radix) method is used to convert a character (char) into a numeric value (u32)
//, based on a given radix (base).
    for c in cc_number.chars().rev() {
//if let is a shorthand way to match and extract values from an Option, Result
//, or any enum when you only care about one specific case
    if let Some(digit) = c.to_digit(10) {
    digits += 1;
    if double {
    let double_digit = digit * 2;
    sum +=
    if double_digit > 9 { double_digit- 9 } else { double_digit };
    } else {
    sum += digit;
    }
    double = !double;
    } else if c.is_whitespace() {
    // New: accept whitespace.
    continue;
    } else {
    // New: reject all other characters.
    return false;
    }
    }
    // New: check that we have at least two digits
    digits >= 2 && sum % 10 == 0
    }

    fn main() {
        let cc_number = "1234 5678 1234 5670";
        println!(
        "Is {cc_number} a valid credit card number? {}",
        if luhn(cc_number) { "yes" } else { "no" }
        );
        }
























