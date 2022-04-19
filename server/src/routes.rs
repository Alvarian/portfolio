use rocket::{Rocket, routes, catchers, ignite};
extern crate r2d2_redis;
use crate::config::db;

use crate::controllers::{projects, handling};
extern crate dotenv;


pub fn build() -> Rocket {
	ignite()
		.manage(db::redis_init())
		.mount(
			"/api/v1/projects", 
			routes![
				projects::read_all,
				projects::read_slides_of_one,
				projects::read_app_of_one
			]
		)
		.register(catchers![handling::not_found])
}

