extern crate postgres;
use postgres::{Client, NoTls};

extern crate dotenv;
use dotenv::dotenv;
use std::env::var;


pub fn db_init() -> postgres::Client {
    dotenv().ok();

    let database_url: String = var("HEROKU_POSTGRESQL_IVORY_URL").unwrap();

    // USE URL INSTEAD
    Client::connect(
        &database_url,
        // &format!(
            // "{}", &database_url
            // "host={} dbname={} user={} password={}",
            // database_host,
            // database_name,
            // database_user,
            // database_password,
        // ),
        NoTls,
    ).unwrap()
}