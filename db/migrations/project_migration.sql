-- CREATE py_port

CREATE TABLE master(
	id int AUTO_INCREMENT,
	username VARCHAR(35),
	password VARCHAR(100),
	PRIMARY KEY (id)
);

CREATE TABLE projects(
	id serial PRIMARY KEY, 
	app_type VARCHAR(255), 
	deployed_url VARCHAR(255), 
	description VARCHAR(255), 
	game_file VARCHAR(255), 
	git_url VARCHAR(255), 
	icon_file VARCHAR(255), 
	style_file VARCHAR(255), 
	title VARCHAR(255)
);

-- mysql -u root -p py_port < C:\Users\Administrator\Desktop\Coding\webDev\deployed_apps\portfolio\flask_v\db\schemas\project_schema.sql
