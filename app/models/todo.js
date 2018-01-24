var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var todoSchema = new Schema({
	text : String,
	done : Boolean,
	date : Date
});

module.exports = mongoose.model('Todo', todoSchema);
