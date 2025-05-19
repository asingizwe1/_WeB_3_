/*
 Imagine You’re in the Kitchen…
Let’s say:

You borrow a cutting board from your neighbor.

You want to use it in your kitchen.

But here's the rule:

You can only use that cutting board as long as your neighbor hasn’t asked for it back.
===================================================================
In Rust, if you borrow data from somewhere (like a string or a number), you can only use it as long as it exists — otherwise, you’re using something that’s been “taken back” (deleted from memory). That’s dangerous!

Rust doesn’t use a garbage collector, so it wants to be super sure that:

Every reference (&data) is still pointing to valid stuff.

Nothing gets used after it's gone (that would crash your program).

*/

//============================

/*
Let’s look at bad code (don't worry, we'll explain):

rust
Copy code
fn get_str() -> &str {
    let s = String::from("hello");
    &s // ⚠️ trying to return a reference to s
}
This looks okay... but it’s WRONG!

Rust says:

❌ “You’re returning a reference to a string that will be destroyed the moment the function ends.”

The moment get_str() ends, s is gone. So returning &s is like giving someone a map to a house that was just demolished.



*/

//============================

/*
✅ How to Fix It (with Lifetimes)
Here’s a safe version:

rust
Copy code
fn get_str<'a>(s: &'a str) -> &'a str {
    s
}
This means:

I accept a reference s that lives for some lifetime 'a.

I return a reference that lives for that same 'a.

Now, Rust can check:
✔️ “If s is alive when you call this, then the result is safe too!”



*/

//============================

/*

Lifetimes in Structs (Noob-Friendly)
Say you have a struct that holds a reference:

rust
Copy code
struct Note<'a> {
    text: &'a str,
}
This means:

The Note struct doesn’t own the text.

It just borrows it.

The 'a lifetime says: “As long as Note exists, the text it points to must still be around.”

That avoids bugs like:

Keeping a Note struct alive after the original text is gone = ❌ CRASH.

Rust helps you prevent that by requiring lifetimes.

💡 In Simple Words:

*/
