use rocket::{get};
use rocket_contrib::json::Json;
use serde_json;

use crate::config::{db};
use crate::models::{Project, Slides};

use crate::mods::{main};


#[get("/")]
pub fn read_all() -> Json<Vec<Project>> {
    let mut proj_result = Vec::new();
    
    for proj_row in db::db_init().query("SELECT * FROM public.projects", &[]).unwrap() {
        proj_result.push(Project {
            id: proj_row.get(0),
            project_type: proj_row.get(1),
            website: proj_row.get(2),
            description: proj_row.get(3),
            app: proj_row.get(4),
            repository: proj_row.get(5),
            icon: proj_row.get(6),
            secret_key: proj_row.get(7)
        });
    }

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