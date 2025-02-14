//Parser is a derive macro that automatically generates code to parse command-line options.
//clap is a popular Rust crate for parsing command-line arguments.
//A parser is a program or a piece of code that takes some input (like text or commands) and breaks it down into parts that a computer can understand.
//A parser is a program or a piece of code that takes some input (like text or commands) and breaks it down into parts that a computer can understand.
use clap::Parser;

use compression_tool::{decoder, encoder, DecodeOpt, EncodeOpt};
/*
Let's say you're making a compression tool, and a user types this in the terminal:

Copy code
mytool encode --file myfile.txt --level 5
A parser will break this command into:

encode → A command that means "compress a file."
--file myfile.txt → Specifies the file to compress.
--level 5 → Sets the compression level.
Your program can then use this structured data to decide what to do.
*/
//Rust attribute syntax- it provides metadata to the Rust compiler and libraries.
#[derive(Parser, Debug)]
//Parser comes from the clap crate and makes the struct a command-line argument parser.
//#[derive(...)] -> attribute macro that automatically implements traits for a struct or enum, It removes the need to write extra code manually.
#[clap(name = "compression tool", about = "Encodes/Decodes input file")]
//This is an attribute specific to clap and provides metadata for the command-line tool.
enum Args {
    #[clap(short_flag = 'e')]
    //. #[clap(short_flag = 'e')] -> This is a clap attribute that:Defines a short flag -e for encoding.
    /// Encode the input file
    Encode(EncodeOpt),
//Encode variant contains an EncodeOpt struct.
    #[clap(short_flag = 'd')]
    /// Decode the input file
    Decode(DecodeOpt),
}
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Args::parse();

    match args {
        Args::Encode(opt) => encoder::encode(opt)?,
        Args::Decode(opt) => decoder::decode(opt)?,
    };

    Ok(())
}




