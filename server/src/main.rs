#![feature(proc_macro_hygiene, decl_macro)]

mod config;
mod routes;
mod controllers;
mod models;

use rocket::http::Method::{Get}; // 1
// use rocket_cors::{
//     AllowedHeaders, AllowedOrigins, // 2.
//     Cors, CorsOptions // 3.
// };

extern crate dotenv;
use std::env::var;


// fn make_cors() -> Cors {
// 	// dotenv().ok();
//     dotenv::from_filename("rocket.env").ok();

// 	// WILL BE LIST OF ADDRESS ROOTS. UPDATE THIS WHEN I KNOW HOW TO MAP LIST OF ENVS AS ARRAY
// 	let portfolio_address: String = var("PORTFOLIO_URL").unwrap();

//     let allowed_origins = AllowedOrigins::some_exact(&[ // 4.
//         portfolio_address
//     ]);

//     CorsOptions { // 5.
//         allowed_origins,
//         allowed_methods: vec![Get].into_iter().map(From::from).collect(), // 1.
//         allowed_headers: AllowedHeaders::some(&[
//             "Authorization",
//             "Accept",
//             "Access-Control-Allow-Origin", // 6.
//         ]),
//         allow_credentials: true,
//         ..Default::default()
//     }
//     .to_cors()
//     .expect("error while building CORS")
// }

fn main() {
    routes::build()
        // .attach(make_cors())
        .launch();
}