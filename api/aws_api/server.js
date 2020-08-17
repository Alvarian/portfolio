const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: '' });

const app = express();


// static folder
app.use(express.static(path.join(__dirname, 'public')));

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// parsers
app.use(express.urlencoded({ extended: false }));

// session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// flash
app.use(flash());

// global var
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');

	next();
});

// landing
app.use('/', require('./routes/master.js'));

// portal
app.use('/', upload.fields([
	{ name: 'game_file', maxCount: 1 }, 
	{ name: 'style_file', maxCount: 1 }, 
	{ name: 'icon_file', maxCount: 1 }
]), require('./routes/portal.js'));


require('dotenv').config();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});