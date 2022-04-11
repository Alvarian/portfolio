const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { s3Create, s3Destroy } = require("../config/s3");
const { checkIfFileIsBufferable, getFileExt } = require("../lib/file-repurposer");
const { mapIfSlidesExist } = require("../lib/data-formater");
const { writeToLog } = require("../lib/logger");


const createProject = async (req, res) => {
	// create new image in s3, after success provide link for each to db to store for fields that require it
	const { title, description, deployed_url, git_url, icon_url } = req.body;
	const { game_file, style_file, icon_file } = req.files;

	try {
		if (req.files.slide_file) {
			const slideBodyInputs = {	
				title, 
				description, 
				deployed_url, 
				game_file: "", 
				style_file: "",
				git_url,
				icon_file: await checkIfFileIsBufferable(s3Create, icon_file || icon_url, `${title.replace(/\s/g, "")}/icon`)
			};

			const result = await prisma.projects.create({
				data: slideBodyInputs,
			});

			for (let i = 0; i < req.files.slide_file.length; i++)	{
				const slide = req.files.slide_file[i];
				const desc = req.body.slide_desc[i];

				const slides = {
					name: `slide_${i}_${title.replace(/\s/g, "")}`,
					project_id: result.id,
					image_url: await checkIfFileIsBufferable(s3Create, [slide], `${title.replace(/\s/g, "")}/slide_image_${i}`),
					description: desc
				};

				await prisma.services.create({
					data: slides,
				});
			}
		} else {
			const gameBodyInputs = {	
				title, 
				description, 
				deployed_url, 
				game_file: await checkIfFileIsBufferable(s3Create, game_file, `${title.replace(/\s/g, "")}/${getFileExt(game_file)}`), 
				style_file: await checkIfFileIsBufferable(s3Create, style_file, `${title.replace(/\s/g, "")}/${getFileExt(style_file)}`),
				git_url,
				icon_file: await checkIfFileIsBufferable(s3Create, icon_file || icon_url, `${title.replace(/\s/g, "")}/icon`)
			};

			await prisma.projects.create({
				data: gameBodyInputs,
			});
		}
	} catch (err) {
		writeToLog("create project: "+err);
	} finally {
		await prisma.$disconnect();

		res.redirect("/portal");
	}
};

const readAllProjects = async (req, res) => {
	try {
		const result = await prisma.projects.findMany({ 
			orderBy: [
				{
					id: "desc",
				}
			]
		});
		const promise = await mapIfSlidesExist(result, prisma);

		const payload = { 
			title: "Portal", 
			projects: await promise
		};
		
		res.render("portal", payload);
	} catch (err) {
		writeToLog("read all projects: "+err);
	} finally {
		await prisma.$disconnect();
	}
};

const updateProject = async (req, res) => {
	// if new logic, icon, or style, overwrite s3 and db fields
	const { title, description, deployed_url, git_url, icon_url, game_url, style_url } = req.body;
	const { game_file, style_file, icon_file } = req.files;

	try {
		const bodyInputs = {	
			title, 
			description, 
			deployed_url, 
			game_file: await checkIfFileIsBufferable(s3Create, game_file || game_url, `${title.replace(/\s/g, "")}/${getFileExt(game_file)}`), 
			style_file: await checkIfFileIsBufferable(s3Create, style_file || style_url, `${title.replace(/\s/g, "")}/${getFileExt(style_file)}`),
			git_url,
			icon_file: await checkIfFileIsBufferable(s3Create, icon_file || icon_url, `${title.replace(/\s/g, "")}/icon`)
		};

		await prisma.projects.update({
			where: {
				id: parseInt(req.params.id)
			},
			data: bodyInputs
		});
	} catch (err) {
		writeToLog("update project: "+err);
	} finally {
		await prisma.$disconnect();

		res.redirect("/portal");
	}
};

const updateSlide = async (req, res) => {
	const slide = req.files.slide_file;
	const desc = req.body.slide_desc;
	const title = req.body.project_title;
	const name = req.body.slide_name;

	try {
		const slidePayload = {
			image_url: await checkIfFileIsBufferable(s3Create, slide, `${title.replace(/\s/g, "")}/${name}`),
			description: desc
		};

		await prisma.services.update({
			where: {
				id: parseInt(req.params.id)
			},
			data: slidePayload,
		});
	} catch (err) {
		writeToLog("update slide: "+err);
	} finally {
		await prisma.$disconnect();

		res.redirect("/portal");
	}
};

const deleteProject = async (req, res) => {
	try {
		if (
			req.body.game_file || 
			req.body.icon_file.replace(/\-|\./gi, "&").split("&").includes("port" && "amazonaws" && "s3") || 
			req.body.slides
		) {
			await s3Destroy(`${req.body.title.replace(/\s/g, "")}/`);
			
			if (req.body.slides) {
				await prisma.services.deleteMany({ where: {project_id: parseInt(req.params.id)} });
			}
		}

		await prisma.projects.delete({ where: {id: parseInt(req.params.id)} });
	} catch (err) {
		writeToLog("delete project: "+err);
	} finally {
		await prisma.$disconnect();

		res.json({ msg: "redirect plase" });
	}
};

const deleteSlide = async (req, res) => {
	try {
		await s3Destroy(`${req.body.title.replace(/\s/g, "")}/${req.body.name}`);
		
		await prisma.services.delete({ where: {id: parseInt(req.params.id)} });
	} catch (err) {
		writeToLog("delete slide: "+err);
	} finally {
		await prisma.$disconnect();

		res.send("ok");
	}
};


module.exports = {
	createProject,
	readAllProjects, 
	updateProject,
	updateSlide,
	deleteProject,
	deleteSlide
};