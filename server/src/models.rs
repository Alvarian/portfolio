use std::string::String;

use serde::{Deserialize, Serialize};


#[derive(Deserialize, Debug, Serialize)]
pub struct Project {
    pub id: i32,
    pub project_type: String,
    pub website: Option<String>,
    pub description: String,
    pub repository: String,
    pub icon: String,
    pub secret_key: Option<String>,
    pub title: String,
    pub version: Option<String>
}

#[derive(Deserialize, Debug, Serialize)]
pub struct Slides {
    pub id: i32,
    pub image_url: String,
    pub project_id: i32,
    pub description: String,
}


