use std::string::String;

use serde::{Deserialize, Serialize};


#[derive(Deserialize, Serialize)]
pub struct Project {
    pub id: i32,
    pub title: String,
    pub description: String,
    pub deployed_url: String,
    pub game_file: String,
    pub style_file: String,
    pub git_url: String,
    pub icon_file: String,
    pub slides: Vec<Service>
}

#[derive(Deserialize, Serialize)]
pub struct Service {
    pub id: i32,
    pub name: String,
    pub project_id: i32,
    pub image_url: String,
    pub description: String
}


