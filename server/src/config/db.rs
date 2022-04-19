use aws_sdk_s3::{config, Client, Credentials, Region};
use r2d2_redis::{r2d2, RedisConnectionManager};

extern crate dhb_postgres_heroku;
use dhb_postgres_heroku::{get_client};

extern crate dotenv;
use std::env::var;


pub fn pg_init() -> dhb_postgres_heroku::Client {
    dotenv::from_filename("rocket.env").ok();
    let database_url: String = var("HEROKU_POSTGRESQL_IVORY_URL").unwrap();
    
    let client = get_client(&database_url);
    client
}

pub fn aws_client() -> std::result::Result<aws_sdk_s3::Client, aws_sdk_s3::Error> {
    dotenv::from_filename("rocket.env").ok();

    let access_key: String = var("ACCESS_KEY_ID").unwrap();
    let secret_key: String = var("ACCESS_SECRET_KEY").unwrap();
    let region: String = var("BUCKET_REGION").unwrap();

    let cred = Credentials::new(access_key, secret_key, None, None, "loaded-from-custom-env");

    let region = Region::new(region);
    let conf_builder = config::Builder::new().region(region).credentials_provider(cred);
    let conf = conf_builder.build();

    let client = Client::from_conf(conf);
	Ok(client)
}

pub fn redis_init() -> r2d2::Pool<RedisConnectionManager> {
    dotenv::from_filename("rocket.env").ok();
    let redis_url: String = var("REDIS_URL").unwrap();

    let manager = RedisConnectionManager::new(format!("{}", redis_url)).unwrap();
    
    r2d2::Pool::builder()
        .build(manager)
        .unwrap()
}