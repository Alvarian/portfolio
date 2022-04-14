use rocket::{Rocket, routes, catchers, ignite};

use crate::controllers::{projects, handling};


pub fn build() -> Rocket {
	ignite()
		.mount(
			"/api/v1/projects", 
			routes![
				projects::read_all,
				projects::read_slides_of_one,
				projects::read_unzip_app_of_one
			],
		)
		.register(catchers![handling::not_found])
}

