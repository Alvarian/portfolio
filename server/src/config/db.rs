extern crate postgres;
use postgres::{Client, NoTls};

extern crate dotenv;
use dotenv::dotenv;
use std::env::var;


pub fn db_init() -> postgres::Client {
    dotenv().ok();

    let database_host: String = var("PSQL_HOST").unwrap();
    let database_user: String = var("PSQL_USER").unwrap();
    let database_password: String = var("PSQL_PASS").unwrap();
    let database_name: String = var("PSQL_DB").unwrap();
    
    // USE URL INSTEAD
    Client::connect(
        &format!(
            "host={} dbname={} user={} password={}",
            database_host,
            database_name,
            database_user,
            database_password,
        ),
        NoTls,
    ).unwrap()
}