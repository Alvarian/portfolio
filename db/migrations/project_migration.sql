-- CREATE py_port

CREATE TABLE master(
	id int AUTO_INCREMENT,
	username VARCHAR(35),
	password VARCHAR(100),
	PRIMARY KEY (id)
);

CREATE TABLE projects(
	id serial PRIMARY KEY, 
	app_type VARCHAR(50), 
	deployed_url VARCHAR(255), 
	description VARCHAR(255), 
	game_file VARCHAR(255) UNIQUE, 
	git_url VARCHAR(255) UNIQUE, 
	icon_file VARCHAR(255) UNIQUE, 
	secret_key VARCHAR(100) UNIQUE, -- sha
	game_toc VARCHAR(50), -- momentjs
	icon_toc VARCHAR(50), -- momentjs
	table_toc VARCHAR(50), -- momentjs
	title VARCHAR(50)
);

-- heroku pg:psql postgresql-perpendicular-73303 --app alvarian-portfolio-v1