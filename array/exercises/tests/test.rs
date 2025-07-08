use array::*;

#[test]
fn test_zeros() {
    let z = zeros();
    assert_eq!(z.len(), 100);
    for n in z {
        assert_eq!(n, 0);
    }
}

#[test]
fn test_first_3() {
    let arr = [1, 2, 3, 4, 5, 6, 7];
    assert_eq!(first_3(&arr), [1, 2, 3]);
}

#[test]
fn test_last_3() {
    let arr = [1, 2, 3, 4, 5, 6, 7];
    assert_eq!(last_3(&arr), [5, 6, 7]);
}
