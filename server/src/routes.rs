use rocket::{Rocket, routes, catchers, ignite};

use crate::controllers::{projects, handling};


pub fn build() -> Rocket {
	ignite()
		.mount(
			"/api/v1/projects", 
			routes![
				projects::read_all
			],
		)
		.register(catchers![handling::not_found])
}

