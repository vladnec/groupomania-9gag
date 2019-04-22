const mongoose = require('mongoose');



const writtenPostSchema = mongoose.Schema({
	title:      		  {type:String, required:true},
	content:    		  {type:String, required:true},
	userId:               {type:String, required:true},
	author_firstname:     {type:String, required:true},
	author_lastname:      {type:String, required:true},

});



module.exports = mongoose.model('WrittenPost', writtenPostSchema);