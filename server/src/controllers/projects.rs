use aws_sdk_s3::{config, types, Client, Credentials, Region};

extern crate r2d2_redis;
use r2d2_redis::{r2d2, redis, RedisConnectionManager};
use r2d2_redis::redis::Commands;

use aws_smithy_http;
use zip;
use rocket::{get};
use rocket_contrib::json::Json;
use ron::de::from_str;
use ron::ser::{to_string_pretty, PrettyConfig};

use crate::config::db;
use crate::models::{Project, Slides};

use crate::mods::main::{print_type_of, unzip_from_buff};

extern crate dotenv;
use std::env::var;

#[derive(Debug)]
pub enum S3Errors {
    StreamErr(aws_smithy_http::byte_stream::Error),
    FutureErr(types::SdkError<aws_sdk_s3::error::GetObjectError>),
    RedisErr(redis::RedisError)
}

impl From<redis::RedisError> for S3Errors {
    fn from(err: redis::RedisError) -> Self {
        S3Errors::RedisErr(err)
    }
}

impl From<aws_smithy_http::byte_stream::Error> for S3Errors {
    fn from(err: aws_smithy_http::byte_stream::Error) -> Self {
        S3Errors::StreamErr(err)
    }
}

impl From<types::SdkError<aws_sdk_s3::error::GetObjectError>> for S3Errors {
    fn from(err: types::SdkError<aws_sdk_s3::error::GetObjectError>) -> Self {
        S3Errors::FutureErr(err)
    }
}

#[get("/")]
pub fn read_all() -> Json<Vec<Project>> {
    let mut proj_result = Vec::new();
    dotenv::from_filename("rocket.env").ok();
    let redis_url: String = var("REDIS_URL").unwrap();

    let manager = RedisConnectionManager::new(format!("{}", redis_url)).unwrap();
    let pool = r2d2::Pool::builder()
        .build(manager)
        .unwrap();
        
    let mut conn = pool.get().unwrap();

    if conn.exists("projects").unwrap() {
        let doc: std::string::String = conn.get("projects").unwrap();
        
        let parsed: Vec<Project> = from_str(&doc).unwrap();

        Json(parsed)
    } else {
        for proj_row in db::db_init().query("SELECT * FROM public.projects", &[]).unwrap() {
            proj_result.push(Project {
                id: proj_row.get(0),
                project_type: proj_row.get(1),
                website: proj_row.get(2),
                description: proj_row.get(3),
                repository: proj_row.get(5),
                icon: proj_row.get(6),
                secret_key: proj_row.get(7),
                title: proj_row.get(10),
                version: proj_row.get(11),
            });
        }
        println!("not cached yet: {:?}", &proj_result);
        let pretty = PrettyConfig::new()
            .depth_limit(2)
            .enumerate_arrays(true);
        let s = to_string_pretty(&proj_result, pretty).expect("Serialization failed");
        let _: () = conn.set_ex("projects", s, 60*60).unwrap();

        Json(proj_result)
    }
}

#[get("/slides?<id>")]
pub fn read_slides_of_one(id: i32) -> Json<Vec<Slides>> {
    dotenv::from_filename("rocket.env").ok();
    let redis_url: String = var("REDIS_URL").unwrap();

    let manager = RedisConnectionManager::new(format!("{}", redis_url)).unwrap();
    let pool = r2d2::Pool::builder()
        .build(manager)
        .unwrap();
        
    let mut conn = pool.get().unwrap();
    let mut proj_result = Vec::new();

    if conn.exists(format!("slides_{}", &id)).unwrap() {
        let doc: std::string::String = conn.get(format!("slides_{}", &id)).unwrap();
        
        let parsed: Vec<Slides> = from_str(&doc).unwrap();

        Json(parsed)
    } else {
        for proj_row in db::db_init().query("SELECT * FROM public.slides WHERE \"projectId\" = $1", &[&id]).unwrap() {
            proj_result.push(Slides {
                id: proj_row.get(0),
                image_url: proj_row.get(1),
                description: proj_row.get(2),
                project_id: proj_row.get(3)
            });
        }
        println!("not cached yet: {:?}", &proj_result);
        let pretty = PrettyConfig::new()
            .depth_limit(2)
            .enumerate_arrays(true);
        let s = to_string_pretty(&proj_result, pretty).expect("Serialization failed");
        let _: () = conn.set_ex(format!("slides_{}", &id), s, 60*60).unwrap();

        Json(proj_result)
    }
}

#[tokio::main]
#[get("/app?<title>&<version>")]
pub async fn read_app_of_one(title: String, version: String) -> std::result::Result<std::string::String, S3Errors> {
    dotenv::from_filename("rocket.env").ok();
    let redis_url: String = var("REDIS_URL").unwrap();

    let manager = RedisConnectionManager::new(format!("{}", redis_url)).unwrap();
    let pool = r2d2::Pool::builder()
        .build(manager)
        .unwrap();
        
    let mut conn = pool.get().unwrap();

    if conn.exists(format!("{}", title)).unwrap() {
        print!("cached encryption");
        let doc: std::string::String = conn.get(format!("{}", title)).unwrap();

        Ok(doc)
    } else {
        println!("not cached yet");

        let client = db::aws_client().unwrap();

        let bucket_name: String = var("BUCKET_NAME").unwrap();
        let res = client
            .get_object()
            .bucket(bucket_name)
            .key(format!("{}/{}", &title, &version))
            .send().await?;

        let stream: types::ByteStream = res.body;

        let zipped_buff = stream.collect().await.map(|data| data.into_bytes());
        let encryption = match zipped_buff {
            Ok(buffer) => unzip_from_buff(buffer),
            Err(_) => panic!("Shoot me")
        };
        let _: () = conn.set_ex(format!("{}", title), &encryption, 60*60)?;

        Ok(encryption)
    }
}

