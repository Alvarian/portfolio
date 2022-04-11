use rocket::{get};
use rocket_contrib::json::Json;

use crate::config::{db};
use crate::models;


#[get("/")]
pub fn read_all() -> Json<Vec<models::Project>> {
    let mut proj_result = Vec::new();

    for proj_row in db::db_init().query("SELECT * FROM public.projects", &[]).unwrap() {
        let id: i32 = proj_row.get(0);
        let title: &str = proj_row.get(1);
        let description: &str = proj_row.get(2);
        let deployed_url: &str = proj_row.get(3);
        let game_file: &str = proj_row.get(4);
        let style_file: &str = proj_row.get(5);
        let git_url: &str = proj_row.get(6);
        let icon_file: &str = proj_row.get(7);

        let mut service_result = Vec::new();

        if game_file.is_empty() && style_file.is_empty() && deployed_url.is_empty() {
            for service_row in db::db_init().query("SELECT * FROM public.services WHERE project_id = $1", &[&id]).unwrap() {
                let id: i32 = service_row.get(0);
                let name: &str = service_row.get(1);
                let project_id: i32 = service_row.get(2);
                let image_url: &str = service_row.get(3);
                let description: &str = service_row.get(4);

                service_result.push(models::Service {
                    id,
                    name: name.into(),
                    project_id,
                    image_url: image_url.into(),
                    description: description.into()
                });
            }

            proj_result.push(models::Project {
                id,
                title: title.into(),
                description: description.into(),
                deployed_url: deployed_url.into(),
                game_file: game_file.into(),
                style_file: style_file.into(),
                git_url: git_url.into(),
                icon_file: icon_file.into(),
                slides: service_result
            });

        } else {
            proj_result.push(models::Project {
                id,
                title: title.into(),
                description: description.into(),
                deployed_url: deployed_url.into(),
                game_file: game_file.into(),
                style_file: style_file.into(),
                git_url: git_url.into(),
                icon_file: icon_file.into(),
                slides: service_result
            });
        }
    }

    Json(proj_result)
}