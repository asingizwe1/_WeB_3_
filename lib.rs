pub trait Iterator<T> {
    fn next(&mut self) -> Option<&T>;
}

pub struct TupleIter<T> {
    pub tuple: (T, T, T),
    pub next: usize, //index next to track which element to return
}
//impl<generic type> Trait<generic type> for Struct<generic type>
impl<T> Iterator<T> for TupleIter<T> {
    fn next(&mut self) -> Option<&T> {
        let next = self.next; //Reads the current index next
        self.next += 1; //Increments next for the next call

        match next {
            0 => Some(&self.tuple.0), //Returns a reference to the corresponding tuple element
            1 => Some(&self.tuple.1),
            2 => Some(&self.tuple.2),
            _ => None,
        }
    }
}

pub struct VecIter<T> {
    pub vec: Vec<T>,
    pub next: usize, //An index next to track the current position
}

impl<T> Iterator<T> for VecIter<T> {
    fn next(&mut self) -> Option<&T> {
        let next = self.next;
        self.next += 1;
        self.vec.get(next) //Uses vec.get(next) to safely return a reference to the element at that index
    }
}
