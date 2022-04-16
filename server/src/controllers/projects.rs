use aws_sdk_s3::{config, types, Client, Credentials, Region};
use redis;
use aws_smithy_http;
use zip;
use rocket::{get};
use rocket_contrib::json::Json;
use bytes::{Bytes};

use crate::config::{db};
use crate::models::{Project, Slides};

use crate::mods::main::print_type_of;

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
    println!("{:?}", proj_result);
    Json(proj_result)
}

#[get("/slides?<id>")]
pub fn read_slides_of_one(id: i32) -> Json<Vec<Slides>> {
    let mut proj_result = Vec::new();
    // main::print_type_of(&id);
    for proj_row in db::db_init().query("SELECT * FROM public.slides WHERE \"projectId\" = $1", &[&id]).unwrap() {
        proj_result.push(Slides {
            id: proj_row.get(0),
            image_url: proj_row.get(1),
            description: proj_row.get(2),
            project_id: proj_row.get(3)
        });
    }

    Json(proj_result)
}

#[tokio::main]
#[get("/app?<title>&<version>&<project_type>")]
pub async fn read_app_of_one(title: String, version: String, project_type: String) -> std::result::Result<std::string::String, S3Errors> {
    dotenv::from_filename("rocket.env").ok();
    let redis_url: String = var("REDIS_URL").unwrap();

    let redis_client = redis::Client::open(redis_url).unwrap();
    let mut con = redis_client.get_tokio_connection().await?;
    // throw away the result, just make sure it does not fail
    // let _ : () = con.setex("my_key", 10, 42)?;
    // read back the key and return it.  Because the return value
    // from the function is a result for integer this will automatically
    // convert into one.
    // con.get("my_key");

    let bucket_name: String = var("BUCKET_NAME").unwrap();
	let access_key: String = var("ACCESS_KEY_ID").unwrap();
	let secret_key: String = var("ACCESS_SECRET_KEY").unwrap();
	let region: String = var("BUCKET_REGION").unwrap();

	let cred = Credentials::new(access_key, secret_key, None, None, "loaded-from-custom-env");

	let region = Region::new(region);
	let conf_builder = config::Builder::new().region(region).credentials_provider(cred);
	let conf = conf_builder.build();

	let client = Client::from_conf(conf);

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
    println!("Encryption: {:?}", encryption);
    println!("{}, {}, {}", &title, &version, &project_type);

    Ok(encryption)
}

fn unzip_from_buff(buf: Bytes) -> std::string::String {
    // For demonstration purposes we read from an empty buffer.
    // Normally a File object would be used.
    let reader = std::io::Cursor::new(buf);

    let mut archive = zip::read::ZipArchive::new(reader).unwrap();
    let file = archive.by_name("project.txt").unwrap();
    
    std::io::read_to_string(file).unwrap()
}