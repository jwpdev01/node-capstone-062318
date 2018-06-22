var express = require('express');
var router = express.Router();

var Movie = require('../models/movie');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	Movie.find({})
	.exec(function(err, movies) {
		if(err) {
			res.send('error as occured');
		}
		else {
			//console.log(books);
			//res.json(movies);
			//res.render('index')
			res.render('results',{movies_list: movies})
		}
	});
	//res.render('results');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;