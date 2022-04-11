const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
const { 
	createUser, readAllUsers
} = require("../controllers/master");


router.get("/", (req, res) => {
	res.render("login", { title: "Portal Login" });
});

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success_msg", "You are logged out");
	res.redirect("/");
});

router.post("/", async (req, res, next) => {
	const { username, password } = req.body;
	let errors = [];

	if (!username || !password) {
		errors.push({ msg: "Please fill in all fields" });
	}

	if (password.length < 6) {
		errors.push({ msg: "Password short be atleast 6 characters" });
	}

	if (errors.length > 0) {
		res.render("login", {
			errors,
			username,
			password
		});
	} else {
		// check length of table rows
		// If zero is truthy, register master
		if ((await readAllUsers()).length) {
			// normal login strategy
			// if un and ps matches, login
			passport.authenticate("local", {
				successRedirect: "/portal",
				failureRedirect: "/",
				failureFlash: true
			})(req, res, next);
		} else {
			new Promise((resolve, reject) => {
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(password, salt, (err, hash) => {
						if (err) reject(err);

						resolve(hash);
					});
				});
			}).then(hashed => {	
				if (createUser(username, hashed)) {
					req.flash("success_msg", "Welcome registered master!");
					res.redirect("/");
				}
			});
		} 

	}
});


module.exports = router;