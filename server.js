console.log('ScheduleDB\'s server.js start up.');
import express from 'express';
const path = require('path');
const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var app = express(); //// Initialize Express App.


var routes = require('./routes/index');
var loginMachine = require('./routes/loginMachine');




//// On start up, set up database, if there already is one delete it.
const file = 'mytodo.db';
fs.access(file, fs.constants.R_OK | fs.constants.W_OK, (err) => {
	if(!err)  {
		console.log(' Database file exists going to delete now. ');
		fs.unlink(file, (err) => { if (err) { console.log("Failed to delete database:"+err); } });
	} else
	{ console.log(' Database file does not exist...'); }

	var password = "roflPlz";
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			var db = new sqlite3.Database(file);
			db.serialize(function() {
			  var DROPtableStatement = "DROP TABLE IF EXISTS Employees;";
				db.run(DROPtableStatement);
				var CREATEtableStatement = "CREATE TABLE Employees ( "+
					"employeeID INTEGER PRIMARY KEY AUTOINCREMENT, "+
					"Firstname TEXT, Lastname TEXT,  Username TEXT, password TEXT, salt TEXT, "+
					"Instructor INTEGER, Lifeguard INTEGER, Headguard INTEGER, Supervisor INTEGER,  "+
					"Availability BLOB, NewNotfications INTEGER )";
				db.run(CREATEtableStatement);
				var INSERTstatement = "INSERT INTO Employees ( employeeID, Firstname, Lastname, Username, password, salt, Instructor, Lifeguard, Headguard, Supervisor, Availability, NewNotfications  )"+
				" values ( null, \"Norman\", \"Potts\", \"Norman.Potts\", \""+hash+"\", \""+salt+"\",  1, 1, 1, 1, \"Not Set Yet\", 0)";
				db.run( INSERTstatement );
				db.close();
			});
    })
	});
		console.log(" Database created.");
});
////Done Database check if exists and create.




//// The View Engine.


//// Body Parser Middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//// Set static path to public folder for static resources.
app.use(express.static(path.join(__dirname, 'public')));

/* Middleware for Express Session. */
app.use(session({ secret: 'secret',	saveUninitialized: true,	resave: true	}));
app.use(passport.initialize());
app.use(passport.session());

//// Express Validator Middleware
app.use(expressValidator());

//// Connect Flash.
app.use(flash());

//// Global variables
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg'); //// global variable for success messages.
	res.locals.error_msg = req.flash('error_msg');     //// for any error messages
	res.locals.error = req.flash('error');             //// passport sets its own flash messages as error.
	res.locals.user = req.user || null;
	next();
});


//// middle ware for route files.
app.use('/', routes);
app.use('/loginMachine', loginMachine);




// GET request to root of app.
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(5000, function(){
	console.log('ScheduleDB\s server.js is listening on port 5000.');
});
