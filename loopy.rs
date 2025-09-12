
    //RETURNING A VALUE FROM A LOOP
    let mut i = 0;
    let z: &str = loop {
        println!("Hello, world!");

        i += 1;
        if i == 10 {
            break "LOOP ENDS HERE";
        }
    };
