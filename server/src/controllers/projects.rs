use aws_config::meta::region::RegionProviderChain;
use aws_sdk_s3::{Client, Error};

use rocket::{get};
use rocket_contrib::json::Json;
use serde_json;

use crate::config::{db};
use crate::models::{Project, Slides};

use crate::mods::{main};

extern crate dotenv;
use std::env::var;


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

#[get("/app?<title>&<version>&<project_type>")]
pub async fn read_unzip_app_of_one(title: String, version: String, project_type: String) {
    // dotenv::from_filename("rocket.env").ok();
    // let access_key: String = var("ACCESS_KEY_ID").unwrap();
    let bucket_name: String = var("BUCKET_NAME").unwrap();

    let region_provider = RegionProviderChain::default_provider().or_else("us-east-2");
    let config = aws_config::from_env().region(region_provider).load().await;
    let client = Client::new(&config);

    let encryption = client
        .get_object()
        .bucket(bucket_name)
        .key(format!("{}/{}", &title, &version));

    println!("Object: {:?}", encryption);

    println!("{}, {}, {}", &title, &version, &project_type);
}