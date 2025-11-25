/*web server that receives an image, then:

Saves it (I/O — async)

Runs heavy analysis (CPU — threads)

Returns results (I/O — async)

Ideal: async + spawn_blocking*/
use tokio::{fs, task};

async fn upload_and_process(path: &str) -> String {
    // 1. I/O — async save
    let bytes = fs::read(path).await.unwrap();

    // 2. CPU work — send to dedicated thread
    let result = task::spawn_blocking(move || {
        heavy_image_analysis(bytes)
    })
    .await
    .unwrap();

    result
}

fn heavy_image_analysis(data: Vec<u8>) -> String {
    // pretend it's GPU/CPU expensive
    "Objects found: car, person, dog".into()
}

#[tokio::main]
async fn main() {
    let r = upload_and_process("img.png").await;
    println!("{r}");
}
