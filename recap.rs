// rust hides test functions using #[cfg(test)]
// Conditional compilation directive
// The cfg (test) Attribute in Rust
// The cfg(test) attribute in Rust is a conditional compilation directive that tells the compiler to compile code only when running tests. This is particularly useful for unit testing, as it allows you to keep the tests in the same file as the code being tested but segregate them into a separate module. This helps maintain codebase cleanliness while still providing robust testing capabilities. The cfg(test) directive is applied to the entire module, ensuring that all code within it is only compiled when the test configuration is active.
//#[cfg(test)]-> for test module
//#[test]-> marks this as a test function

//#[cfg(test)] ->Applied to a module (usually named mod tests).
//->Ensures that everything inside is only compiled when running cargo test
fn main() {
    pub fn add(a: i32, b: i32) -> i32 {
        return a + b;
    }

    #[cfg(test)] //tells that only include this test when you run cargo test
                 //Keeps test-only code out of production builds.
                 //this helps when you have other helpers
    mod tests {
        use Super::*; //use all functions from parent module

        #[test]
        fn testForPositive() {
            assert_eq!(add(2, 4), 6);
        }
        #[test]
        fn testForNegative() {
            assert_eq!(add(2, -4), 6);
        }
    }
}
//HELPER CASE
//pub fn add(a: i32, b: i32) -> i32 { a + b }
// #[cfg(test)] mod tests { use super::*; fn helper_add_twice(x: i32) -> i32
//     { add(x, x) // helper only for tests } #[test] fn test_add_positive_numbers()
//         { assert_eq!(add(2, 3), 5); }
//         #[test] fn test_helper_function()
//         { assert_eq!(helper_add_twice(4), 8); } }
