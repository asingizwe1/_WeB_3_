
// File: array_example.cairo
// Cairo 1.0 example: Working with arrays

use core::array::ArrayTrait;
use core::array::Array;

fn main() {
    // Create an array of felt values
    let mut my_array: Array<felt252> = Array::new();

    // Append some values
    my_array.append(10);
    my_array.append(20);
    my_array.append(30);

    // Access elements (note: get returns Option, so we unwrap using match)
    let first = my_array.get(0);
    match first {
        Option::Some(val) => {
            assert(*val == 10, 'First element should be 10');
        },
        Option::None => {
            panic('Element not found');
        },
    };

    // Get length
    let len = my_array.len();
    assert(len == 3, 'Array should have 3 elements');
}
