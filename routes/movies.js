var express = require('express');
var router = express.Router();

var Movie = require('../models/movie');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('movies');
});

router.get('/all', ensureAuthenticated, (req, res) => {
	console.log('getting all movies...');
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
});

router.post('/search/', ensureAuthenticated, function(req, res){
	 console.log('search one');
	let id = req.body.id;

	Movie.findById({ _id : id }, 
		function (err, movie) {
			if(err) {
				res.send(err);
			}
			else {
				res.render('results',{
					_id1: movie._id,
					title1 : movie.title,
					year1: movie.year,
					rating1: movie.rating
					})
			}
	});
});

// Add Movie
router.post('/add', ensureAuthenticated, function (req, res) {
console.log(req.body);

/*var title1 = req.body.title1;
var year1 = req.body.email1;
var rating1 = req.body.rating1;

// Validation
req.checkBody('title1', 'Movie Title is required').notEmpty();
req.checkBody('year1', 'Year is required').notEmpty();
req.checkBody('rating1', 'Rating is required').notEmpty();

var errors = req.validationErrors();

if (errors) {
	res.render('register', {
		errors: errors
	});*/


if (req.body.id1 !== "") {
	console.log(`update movie`);
	Movie.findOneAndUpdate({
		_id:req.body.id1
		}, {$set:req.body},
			//{upsert:true},
			{upsert: true, new:true},
		(err, newMovie) => {
			if(err) {
				console.log(err);
			}
			else {
				res.redirect('/');
			}
		});
}
else  {
	console.log('new movie')	 
	let title = req.body.title1;
	let year = req.body.year1;
	let rating = req.body.rating1;
	//let description = req.body.description;

	// Validation
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('year', 'Year is required').notEmpty();
	req.checkBody('rating', 'Rating is required').notEmpty();
	//req.checkBody('description', 'Description is required').notEmpty();
	
	var errors = req.validationErrors();

	const newMovie = new Movie(req.body);
	newMovie.save();
	//res.render('results');
	res.redirect('/');
	}
});

router.post('/delete/', ensureAuthenticated, (req, res) => {

 console.log(req.body.id);
 let id = req.body.id;
      
 Movie.remove({ _id : id }, function(err) {
 	if (err)
 		res.send(err);
 	else
 		res.redirect('/');
 	}); 
})

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}



module.exports = router;