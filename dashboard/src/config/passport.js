const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const { 
	readOneUser
} = require("../controllers/master");


module.exports = function(passport) {
	passport.use(
		new localStrategy({ 
			usernameField: "username",
			passwordField: "password"
		}, 
		async (username, password, done) => {
			const m = await readOneUser(username);

			if (!m) {
				return done (null, false, { message: "You are not the master" });
			}

			bcrypt.compare(password, m.password, (err, isMatch) => {

				if (isMatch) {
					return done(null, m.username);
				} else {
					done(null, false, { message: "Password Incorrect" });
				}
			});
		})
	);

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(async (id, done) => {
		try {	
			const m = await readOneUser(id);

			done(null, m.username);
		} catch (err) {
			done(err, null);
		}
	});
};