const db = require('../config/db');
const { s3Create, s3Destroy } = require('../config/s3');


const createProject = async (req, res) => {
	// create new image in s3, after success provide link for each to db to store for fields that require it
	const { title, description, deployed_url, git_url, icon_url } = req.body;
	const { game_file, style_file, icon_file } = req.files;

	const getFileExt = ({originalname}) => {
		if (originalname.split('.')[1] === 'js') {	
			return 'javascript';
		}

		if (originalname.split('.')[1] === 'css') {
			return 'cascade';
		}
	};

	try {	
		const bodyInputs = [	
			title, 
			description, 
			deployed_url, 
			await checkIfFileIsBufferable(s3Create, game_file, `${title.replace(/\s/g, '')}/${getFileExt(game_file[0])}`), 
			await checkIfFileIsBufferable(s3Create, style_file, `${title.replace(/\s/g, '')}/${getFileExt(style_file[0])}`),
			git_url,
			await checkIfFileIsBufferable(s3Create, icon_file || icon_url, `${title.replace(/\s/g, '')}/icon`)
		];

		db.query(`SELECT * FROM public.add_project($1, $2, $3, $4, $5, $6, $7)`, bodyInputs,
		(err, result) => {
			if (err) throw err;
		});
	} catch (err) {
		console.log('Failed to create project files in aws', err);
	} finally {
		res.redirect('/portal');
	}
};

const readAllProjects = (req, res) => {
	db.query(`SELECT * FROM public.find_all_projects()`, (err, result) => {
		if (err) throw err;

		res.render('portal', { 
			title: 'Portal', 
			projects: result.rows.reverse()
		});
	});
};

const checkIfFileIsBufferable = (cb, file, awsKey) => {
	return new Promise(async function(resolve, reject) {
console.log(file)
		if (typeof file === 'string' || !file) {
			return resolve(file);
		}

		resolve(cb(file, awsKey));
	});
};

const updateProject = async (req, res) => {
	// if new logic, icon, or style, overwrite s3 and db fields
	const { title, description, deployed_url, git_url, icon_url, game_url, style_url } = req.body;
	const { game_file, style_file, icon_file } = req.files;

	const getFileExt = (file) => {
		if (!file) return null;

		const {originalname} = file[0];

		if (originalname.split('.')[1] === 'js') {	
			return 'javascript';
		}

		if (originalname.split('.')[1] === 'css') {
			return 'cascade';
		}
	};

	try {
		const bodyInputs = [	
			title, 
			description, 
			deployed_url, 
			await checkIfFileIsBufferable(s3Create, game_file || game_url, `${title.replace(/\s/g, '')}/${getFileExt(game_file)}`), 
			await checkIfFileIsBufferable(s3Create, style_file || style_url, `${title.replace(/\s/g, '')}/${getFileExt(style_file)}`),
			git_url,
			await checkIfFileIsBufferable(s3Create, icon_file || icon_url, `${title.replace(/\s/g, '')}/icon`)
		];	
		
		db.query(`SELECT * FROM public.update_project(${req.params.id}, $1, $2, $3, $4, $5, $6, $7)`, bodyInputs,
		(err, result) => {
			if (err) throw err
		});
	} catch (err) {
		console.log('promise err from update', err)
	} finally {
		res.redirect('/portal');
	}
};

const deleteProject = async (req, res) => {
	try {
		await s3Destroy(`${req.body.title.replace(/\s/g, '')}/`);
	
	} catch (err) {
		console.log('huh', err);
	} finally {
		db.query(`SELECT * FROM public.delete_project(${req.params.id})`, (err, result) => {
			if (err) throw err
			
			res.json({ msg: 'redirect plase' });
		});
	}
};


module.exports = {
	createProject,
	readAllProjects, 
	updateProject,
	deleteProject
}