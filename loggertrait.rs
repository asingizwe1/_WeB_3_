// a simple logging utility
//Code which might log its progress can then take an &impl Logger.
// In testing, this might put messages in the test logfile, while in a production build it would send messages to a log server.
//Logging in programming is the process of recording events that occur when a program is running
//Verbosity in logging refers to how much detail a log message contains or how much information is logged by the program.
//Some log messages are very basic (e.g., "Error occurred"), while others might include detailed context (e.g., "Error in file main.rs at line 42 while processing user input")
//Loggers (like StdoutLogger): A logger is a tool or structure that sends log messages to some output, like a file, the terminal, or a log server.
//Each log message can have a verbosity level:
//Low verbosity (e.g., 1): Logs only critical or important events.
//High verbosity (e.g., 5): Logs everything, including debugging details, less important information, etc.
//A verbosity filter lets you specify a maximum level of verbosity. Messages with a higher verbosity level (less important ones) will be ignored.
/*
How This Works: Step-by-Step Analogy
Imagine you’re in a noisy room with different people talking:

Some are shouting important things (low verbosity).
Others are chatting about random stuff (high verbosity).
You’re only interested in the important things, so you:

Put on noise-canceling headphones.
Only listen to people who are shouting below a certain volume (i.e., within your verbosity threshold).
*/

/*
This pattern (wrapping something and modifying its behavior) is common in logging utilities, where you might want to:

Add timestamps to log messages.
Filter out sensitive information.
Send logs to multiple destinations (e.g., file + server).
*/
/*
the original logger (like StdoutLogger) is your toy. It logs everything.
The wrapper (like VerbosityFilter) is the gift box. It decides if the toy should do its job or not, based on some rules.
*/

pub trait Logger {
    /// Log a message at the given verbosity level.
    fn log(&self, verbosity: u8, message: &str);
    }
    struct StdoutLogger;
    impl Logger for StdoutLogger {
    fn log(&self, verbosity: u8, message: &str) {
    println!("verbosity={verbosity}: {message}");
    }
    }
    // TODO: Define and implement `VerbosityFilter`.
struct VerbosityFilter {
    max_verbosity:u8,
    inner:StdoutLogger//if you want to represent a struct inside another struct you use inner
}
impl Logger for VerbosityFilter{
fn log(&self,verbosity: u8,message: &str){
if verbosity<=self.max_verbosity{
    self.inner.log(verbosity,message);
    //dot (.) to access elements of struct
}

}

}

    fn main() {
    let logger = VerbosityFilter { max_verbosity: 3, inner: StdoutLogger };
    logger.log(5, "FYI");
    logger.log(2, "Uhoh");
    }