
// solution improves the original code by replacing panic!() 
//with structured error handling using thiserror and anyhow
use std::iter::Peekable;
use std::str::Chars;
/// An arithmetic operator.
enum Op {
Add,
Sub,
}

//Instead of panicking on unexpected characters, the tokenizer now returns 
//an Err(TokenizerError::UnexpectedCharacter(c)) when it encounters an invalid character.

enum TokenizerError{
UnexpectedCharacter(char),
}
//new ParserError is introduced
enum ParserError{
//Wraps tokenizer errors (TokenizerError) using #[from]
//,enabling automatic conversions.
TokenizerError(#[from] TokenizerError),
//Handles unexpected end-of-file (EOF) (i.e., the input ends unexpectedly).
UnexpectedEOF,
//Handles unexpected tokens (e.g., an operator appearing in the wrong place).
    UnexpectedToken(Token),
    InvalidNumber(#[from] std::num::ParseIntError),

}
/// A token in the expression language.
enum Token {
Number(String),
Identifier(String),
Operator(Op),
}
/// An expression in the expression language.
enum Expression {
/// A reference to a variable.
Var(String),
/// A literal number.
Number(u32),

/// A binary operation.
Operation(Box<Expression>, Op, Box<Expression>),
}
fn tokenize(input: &str)-> Tokenizer {
return Tokenizer(input.chars().peekable());
}
struct Tokenizer<'a>(Peekable<Chars<'a>>);
//Modifying Tokenizer to Return Result<Token, TokenizerError>
//Previously, Tokenizer's Iterator implementation returned Option<Token>
impl<'a> Tokenizer<'a> {
fn collect_number(&mut self, first_char: char)-> Token {
let mut num = String::from(first_char);
while let Some(&c @ '0'..='9') = self.0.peek() {
num.push(c);
self.0.next();
}
Token::Number(num)
}
fn collect_identifier(&mut self, first_char: char)-> Token {
let mut ident = String::from(first_char);
while let Some(&c @ ('a'..='z' | '_' | '0'..='9')) = self.0.peek() {
ident.push(c);
self.0.next();
}
Token::Identifier(ident)
}
}
impl<'a> Iterator for Tokenizer<'a> {
type Item = Token;
fn next(&mut self)-> Option<Token> {
let c = self.0.next()?;
match c {
'0'..='9' => Some(self.collect_number(c)),
'a'..='z' => Some(self.collect_identifier(c)),
'+' => Some(Token::Operator(Op::Add)),
'-' => Some(Token::Operator(Op::Sub)),
_ => Some(Err(TokenizerError::UnexpectedCharacter(c))), // Instead of `panic!()`
//_ => panic!("Unexpected character {c}"),
//Now, when an unexpected character is encountered, instead of crashing the program,
// an Err is returned.

}
}
}
//Updating the parse Function to Propagate Errors
//The original parse function would panic when an unexpected token was encountered.
//The new version uses Result<Expression, ParserError> to return errors instead of panicking.
fn parse(input: &str)-> Result<Expression, ParserError>  /*Expression*/ {
let mut tokens = tokenize(input);
//we return reult which is 2 options an error or the actual expression
fn parse_expr<'a>(tokens: &mut Tokenizer<'a>)-> Result<Expression,ParseError>/*Expression*/ {
//let Some(tok) = tokens.next() else {panic!("Unexpected end of input");};
//The function starts by getting a token:
let tok = tokens.next().ok_or(ParserError::UnexpectedEOF)??;
//tokens.next() returns Option<Result<Token,TokenizerError>>
//ok_or(ParserError::UnexpectedEOF) converts None to an error.
//The first ? unwraps the Option<Result<Token,TokenizerError>> (propagating None as UnexpectedEOF).
//The second ? unwraps the Result<Token, TokenizerError> (propagating TokenizerError).
let expr = match tok {
Token::Number(num) => {
  //let v = num.parse().expect("Invalid 32-bit integer");
  //function ensures that errors from parsing numbers propagate properly:
  //thanks to #[from] std::num::ParseIntError.
  let v = num.parse()?;
//If parsing fails, the ? operator automatically converts the error into ParserError::InvalidNumber
//thanks to #[from] std::num::ParseIntError.
  Expression::Number(v)
}
Token::Identifier(ident) => Expression::Var(ident),
//Token::Operator(_) => panic!("Unexpected token {tok:?}"),
Token::Operator(_) => return Err(ParserError::UnexpectedToken(tok)),
//Instead of panic!(), unexpected tokens now return an error:

};
// Look ahead to parse a binary operation if present.
//add Ok

Ok(match tokens.next() {
None => expr,
Some(Token::Operator(op)) => Expression::Operation(
Box::new(expr),
op,
Box::new(parse_expr(tokens)),// Propagating errors
),
Some(Err(e)) => return Err(e.into()), // Handling tokenizer errors
Some(Ok(tok)) => return Err(ParserError::UnexpectedToken(tok)),
/*
If tokens.next() is Err(e), it propagates using into().
If tokens.next() is an unexpected token, it returns an UnexpectedToken error.
Some(tok) => panic!("Unexpected token {tok:?}"),*/
})
}
parse_expr(&mut tokens)
}
fn main() {
let expr = parse("10+foo+20-30");
println!("{expr:?}");
//
Ok(())
}


