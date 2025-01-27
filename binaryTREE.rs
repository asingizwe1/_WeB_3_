//Abinary tree is a tree-type data structure where every node has two children (left and right)
// Extra Credit: implement an iterator over a binary tree that returns the values in order
use std::cmp::Ordering;
//struct datatype for a node
//specify the trait a given type is mean to be potraid by the type
struct Node<T: Ord>{
    value: T,
    
    left: Subtree<T>,
    right: Subtree<T>,
}

//due to possibility of being empty or something existing we use OPTION trait
// when it comes to structures that need ordering use the Ord trait
struct Subtree<T: Ord>(Option<Box<Node<T>>>);
//box is used because binary trees are recursive
 /// A container storing a set of values, using a binary tree.
 ///
 /// If the same value is added multiple times, it is only stored once.
 pub struct BinaryTree<T: Ord> {
    root: Subtree<T>,
    }
    impl<T: Ord> BinaryTree<T> {
        fn new()-> Self {
        Self { root: Subtree::new() }
        }
        fn insert(&mut self, value: T) {
        self.root.insert(value);
        }
        fn has(&self, value: &T)-> bool {
        self.root.has(value)
        }
        fn len(&self)-> usize {
            self.root.len()
            }
            }
            // Implement `new`, `insert`, `len`, and `has` for `Subtree`.
 mod tests {
    use super::*;
    fn len() {
    let mut tree = BinaryTree::new();
    assert_eq!(tree.len(), 0);
    tree.insert(2);
    assert_eq!(tree.len(), 1);
    tree.insert(1);
    assert_eq!(tree.len(), 2);
    tree.insert(2); // not a unique item
    assert_eq!(tree.len(), 2);
    }
    fn has() {
    let mut tree = BinaryTree::new();
    fn check_has(tree: &BinaryTree<i32>, exp: &[bool]) {
    let got: Vec<bool> =
    (0..exp.len()).map(|i| tree.has(&(i as i32))).collect();
    assert_eq!(&got, exp);
    }
    check_has(&tree, &[false, false, false, false, false]);
    tree.insert(0);
    check_has(&tree, &[true, false, false, false, false]);
    tree.insert(4);
    check_has(&tree, &[true, false, false, false, true]);
    tree.insert(4);
    check_has(&tree, &[true, false, false, false, true]);
    tree.insert(3);
    check_has(&tree, &[true, false, false, true, true]);
    }
    fn unbalanced() {
    let mut tree = BinaryTree::new();
    for i in 0..100 {
    tree.insert(i);
    }
    assert_eq!(tree.len(), 100);
    assert!(tree.has(&50));
    }
    }