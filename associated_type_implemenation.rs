trait Payment {
    type Currency;  // Associated type for the currency type

    fn pay(&self, amount: u64, recipient: &str) -> Self::Currency;
}
struct TokenPayment;
impl Payment for TokenPayment {
    type Currency = String;

    fn pay(&self, amount: u64, recipient: &str) -> Self::Currency {
        format!("Transferred {} tokens to {}", amount, recipient)
    }
}

fn main() {
    let eth_payment = TokenPayment;
    let btc_payment = TokenPayment;

    println!("{}", eth_payment.pay(10, "Alice"));  // Transferred 10 tokens to Alice
    println!("{}", btc_payment.pay(5, "Bob"));    // Transferred 5 tokens to Bob
}
