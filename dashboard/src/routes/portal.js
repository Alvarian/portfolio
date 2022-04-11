const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const { 
	createProject,
	readAllProjects,
	updateProject,
	updateSlide,
	deleteProject,
	deleteSlide
} = require("../controllers/portal");


router.get("/portal", ensureAuthenticated, readAllProjects);

router.post("/portal", ensureAuthenticated, createProject);

router.post("/portal/update/:id", ensureAuthenticated, updateProject);

router.post("/portal/slide/update/:id", ensureAuthenticated, updateSlide);

router.post("/portal/delete/:id", ensureAuthenticated, deleteProject);

router.post("/portal/slide/delete/:id", ensureAuthenticated, deleteSlide);


module.exports = router;