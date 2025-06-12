//rust comes with a test framework
fn main() {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b;
    }

    #[cfg(test)]
    mod test {
        use super::*; // allows us to use `add()` from the parent module

        #[test]
        fn test_add() {
            assert_eq!(add(2, 3), 5);
        }
    }

    //run cargo test
}
