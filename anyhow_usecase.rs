use anyhow::{Result, bail};
//<()> - returns nothing if successful
fn do_something() -> Result<()> {
    let ok = false;

    if !ok {
        bail!("something went wrong!");
    }

    println!("Success!");
    Ok(())
}
