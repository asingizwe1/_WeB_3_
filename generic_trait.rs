trait List<T> {
    //any element that implements list will be able to return number of elements contained
    fn count(&self) -> usize;
    fn first(&self) -> &u32;
}

impl List<u32> for (u32, u32, u32) {
    fn count(&self) -> usize {
        3
    }
    fn first(&self) -> &u32 {
        &self.0;
    }
}

//impl<T> -> means we are implementing a generic trait
impl<T> List<T> for Vec<T> {
    fn count(&self) -> usize {
        3
    }
    fn first(&self) -> &T {
        &self.0;
    }
}

fn main() {
    let v: Vec<u32> = vec![10, 20, 30];
    println!("number of elements: {}", v.count());
    println!("first element: {}", v.first());
}
