extern crate dhb_postgres_heroku;
use dhb_postgres_heroku::{get_client};

extern crate dotenv;
use std::env::var;


pub fn db_init() -> dhb_postgres_heroku::Client {
    dotenv::from_filename("rocket.env").ok();
    let database_url: String = var("HEROKU_POSTGRESQL_IVORY_URL").unwrap();
    
    let client = get_client(&database_url);
    client
}
