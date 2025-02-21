enum Currency {
    Ethereum,
    Bitcoin,
    Solana,
    Custom(String),  // For other tokens
}

trait Payment {
    type Currency;
//instead of hardcoding a specific return type (like String or Ethereum), we make it flexible.
//Self::Currency;
    fn pay(&self, amount: u64, recipient: &str) -> Self::Currency;
}

struct BlockchainPayment;
impl Payment for BlockchainPayment {
    type Currency = Currency;

    fn pay(&self, amount: u64, recipient: &str) -> Self::Currency {
        Currency::Custom(format!("{} tokens to {}", amount, recipient))
    }
}
fn main() {
    let payment = BlockchainPayment;
    let transaction = payment.pay(50, "Alice");

    match transaction {
        Currency::Custom(desc) => println!("{}", desc),  
        _ => println!("Other currency"),
    }
}