const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "" });
const { writeToLog } = require("./lib/logger");

const app = express();

// ejs
app.set("views", __dirname + "/views");
app.use(expressLayouts);
app.set("view engine", "ejs");

// parsers
app.use(express.urlencoded({ extended: false }));

// session
app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));

// passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// flash
app.use(flash());

// global var
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");

	next();
});

// landing
app.use("/", require("./routes/master.js"));

// portal
app.use("/", upload.fields([
	{ name: "game_file", maxCount: 1 }, 
	{ name: "style_file", maxCount: 1 }, 
	{ name: "icon_file", maxCount: 1 }, 
	{ name: "slide_file", maxCount: 4 }, 
	{ name: "slide_desc", maxCount: 4 }
]), require("./routes/portal.js"));


require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	writeToLog(`Server listening on port ${PORT}`);
});