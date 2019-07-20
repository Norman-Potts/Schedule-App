var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var sqlite3 = require("sqlite3").verbose();
const myDbfile = 'mytodo.db';


//// Register Route
router.get('/CreateNewEmployee', function(req, res) {
	//res.render('register');
});

//// Employee Login Route
router.get('/login', function(req, res) {

	//res.render('login');
});










passport.use(new LocalStrategy(function(Given_Username, Given_Password, done) {
	console.log("Given_Username: "+Given_Username+" Given_Password: "+Given_Password+"");
	var db = new sqlite3.Database(myDbfile);
	db.get('SELECT salt, password, Username, employeeID  FROM Employees WHERE Username = ?', Given_Username, function(err, row) {
		if (!row) { return done(null, false, {message:"Unknown User"}); }
		var storedPassword = row.password;
		var candidatePassword = Given_Password;
		bcrypt.compare(candidatePassword, storedPassword, function(err, isMatch) {
			if(err) throw err;
			if (!isMatch) {
				return done(null, false, {message:"Invalid Password"});
			} else {
				return done(null, row);
			}
		});
	});
}));




passport.serializeUser(function(employee, done) {
	return done(null, employee.employeeID);
});

passport.deserializeUser(function(id, done) {
	var db = new sqlite3.Database(myDbfile);
	db.get('SELECT employeeID, Username FROM Employees WHERE employeeID = ?', id, function(err, row) {
		if (!row){ return done(null, false); }
		return done(null, row);
	});
});

router.post('/API/TryLogin', passport.authenticate('local', {successRedirect: '/Homepage', failureRedirect: '/Loginpage', failureFlash: true}),
function(req, res) {
	console.log("API/Login");
	res.redirect('/');

});



router.get('/logout', function (req, res) {
	req.logout();
  req.flash('success_msg', 'You are logged out');
	res.redirect('/LoginPage');
});



module.exports = router;
