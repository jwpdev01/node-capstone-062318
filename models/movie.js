let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MovieSchema = new Schema({
	title: {
		type: String,
		index:true,
		required: true,
		unique: true
	},
	year: {
		type: String
	},
	rating: {
		type: String
	},
	description: {
		type: String
	},
	actors: {
		type: String
	},
	poster: {
		type: String
	},
	runtime: {
		type: String
	}
});



module.exports = mongoose.model('Movie', MovieSchema);