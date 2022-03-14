-- SEED FROM DYNAMODB 6/7/2019

INSERT INTO projects (
	app_type, 
	deployed_url, 
	description, 
	game_file, 
	git_url, 
	icon_file, 
	secret_key, 
	init_vector, 
	title 
)
VALUES (
	'Deployed Website', 
	'https://dek-flashcards.herokuapp.com/', 
	'A memory card game!', 
	'None', 
	'https://github.com/Alvarian/DEK', 
	'https://s3.us-east-2.amazonaws.com/port-bucket/DEK/image-jpeg',
	'None',
	'None',
	'DEK'
);

INSERT INTO projects (
	app_type, 
	deployed_url, 
	description, 
	game_file, 
	git_url, 
	icon_file, 
	secret_key, 
	init_vector, 
	title 
)
VALUES (
	'Sample App', 
	'None', 
	'Order the digits, least to greatest, top to bottom, left to right leaving the blank dud last to disarm the bomb!', 
	'https://s3.us-east-2.amazonaws.com/port-bucket/Mystic8/text-javascript', 
	'https://github.com/Alvarian/static_env/tree/master/views/partials/ALTZ-082B', 
	'https://s3.us-east-2.amazonaws.com/port-bucket/Mystic8/image-png', 
	'None',
	'76 a1 a6 dd 5f a7 13 8d 86 e3 bd 5c a8 55 1f 25',
	'Mystic8'
);

INSERT INTO projects (
	app_type, 
	deployed_url, 
	description, 
	game_file, 
	git_url, 
	icon_file, 
	secret_key, 
	init_vector, 
	title 
)
VALUES (
	'Sample App', 
	'None', 
	'Pick a side and get three strikes in a row before your opponent does!', 
	'https://s3.us-east-2.amazonaws.com/port-bucket/Rivalry/text-javascript', 
	'https://github.com/Alvarian/RIVALRY', 
	'https://s3.us-east-2.amazonaws.com/port-bucket/Rivalry/image-png', 
	'None',
	'None',
	'Rivalry'
);
