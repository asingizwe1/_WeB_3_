pub fn first<T, V>(t: (T, V)) -> T {
    t.0
}

pub fn last<T, V>(t: (T, V)) -> V {
    t.1
}

#[derive(Debug)]
pub struct Rectangle<T> {
    pub top: T,
    pub left: T,
    pub width: T,
    pub height: T,
}
