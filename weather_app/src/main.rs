use actix_web::{web,App,HttpServer,HttpResponse};
use reqwest::Client;//This imports the Client from the reqwest crate, which is used for making HTTP requests.
use serde::Deserialize;//This imports the Deserialize trait from serde, which is used for converting JSON into Rust structs.
use std::env;// Stores and retrieves an environment variable (API_KEY).

//receive a JSON response from an API, Rust (using serde and reqwest) will automatically convert the JSON data into your defined Rust struct format.

//if you want to implement a trait use derive
#[derive(Deserialize)]//Enables automatic conversion (deserialization) from JSON into a Rust struct using serde.
struct WeatherResponse{
main:Main,
name:String,
}

#[derive(Deserialize)]
struct Main{
    temp:f32,
}

//async → This function runs asynchronously (does not block execution).
async fn index() -> HttpResponse {
    // .env file is used to store API keys securely
    let api_key = env::var("OPENWEATHERMAP_API_KEY").expect("API key not found");
    
    let city = "London"; // You can replace this with any city
    
    // Constructs the API request URL
    let url = format!(
        "http://api.openweathermap.org/data/2.5/weather?q={}&appid={}&units=metric",
        city, api_key
    );

    // Sends a GET request asynchronously
    let response = Client::new().get(&url).send().await;
//Client::new() → Creates a new HTTP client (from reqwest crate).
//.get(&url).send().await → Sends a GET request asynchronously.

match response {
    Ok(res) => {
        //Converts res into WeatherResponse struct (which stores JSON data).
        //await Waits for an Async Task to Complete
        let weather_data: WeatherResponse = res.json().await.expect("Failed to parse JSON");
        let temperature = weather_data.main.temp;
        let city_name = weather_data.name;
        HttpResponse::Ok().body(format!("Weather in {}: {:.1}°C", city_name, temperature))
    }
    Err(_) => HttpResponse::InternalServerError().body("Failed to fetch weather data"),
}


}


#[actix_web::main]//Marks this as an async main function
//for network requests or some sort of leading we use async
async fn main() -> std::io::Result<()> //Defines an async function that returns a Result
{//async, a function doesn’t block the rest of the program. Instead, it pauses and lets other tasks run while waiting for something to complete (like a network request).
dotenv::dotenv().ok();
HttpServer::new(|| {
App::new().route("/", web::get().to(index))
})
.bind("127.0.0.1:8080")?
.run()
.await
}
/*
Synchronous (Blocking):

Boil water (wait)
Brew tea (wait)
Drink tea (finally!)

Asynchronous (Non-Blocking):
Start boiling water (doesn’t wait)
Do other tasks (e.g., check messages 📱)
When water is ready, continue tea-making
Drink tea
That’s what async does—it allows your program to do other work while waiting instead of just sitting idle.
*/

/*USECASES FOR ASYNC and await
### **Use Cases of `async` and `await` in Blockchain Development**  

1️⃣ **Interacting with Smart Contracts** – Calling smart contract functions asynchronously (e.g., querying balances, sending transactions).  
2️⃣ **Fetching Blockchain Data** – Retrieving blocks, transactions, and events from nodes without blocking execution.  
3️⃣ **Handling Multiple Wallet Connections** – Managing multiple users interacting with a DApp.  
4️⃣ **Processing Transactions in Parallel** – Submitting and confirming multiple transactions simultaneously.  
5️⃣ **Listening to Blockchain Events** – Subscribing to real-time updates (e.g., detecting when a payment is received).  
6️⃣ **Decentralized Storage Access** – Fetching data from IPFS or Arweave efficiently.  


1️⃣ HTTP Requests & APIs – Fetching data from APIs (e.g., weather data) without blocking execution.
2️⃣ Web Servers – Handling multiple users at once in web frameworks like actix-web.
3️⃣ Database Queries – Running slow queries without freezing the app.
4️⃣ File I/O – Reading/writing large files efficiently.
5️⃣ Background Tasks – Running periodic tasks like sending emails or processing logs.
6️⃣ Concurrency – Running multiple tasks simultaneously, like downloading multiple files at once.
*/