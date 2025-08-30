fn main() {
    #[derive(Debug, PartialEq)]
    pub enum Color {
        //enum is made public because it can be reused in other files
        Red,

        Green,

        Blue,

        Rgba(u8, u8, u8, f32),
    }
}
