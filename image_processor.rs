use rayon::prelude::*;
use image::{open, DynamicImage};

fn process(img: DynamicImage) -> DynamicImage {
    img.blur(1.5).brighten(20).resize(800, 600, image::imageops::Triangle)
}

fn main() {
    let images = vec!["1.jpg", "2.jpg", "3.jpg", ...];

    images.par_iter()
        .for_each(|path| {
            let img = open(path).unwrap();
            let processed = process(img);
            processed.save(format!("out_{}", path)).unwrap();
        });

    println!("All images processed!");
}
