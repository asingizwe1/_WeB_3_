#[derive(Debug)]
pub struct Account {
    pub address: String,
    pub balance: u32,
}

pub fn new(address: String) -> Account {
    Account {
        address: address,
        balance: 0,
    } //we dont put ";" we leave it blank because ";" makes it a statement while
      //when you leave it vlank in a function  it means thats bthe value you are returning
}
