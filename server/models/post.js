const mongoose = require('mongoose');



const postSchema = mongoose.Schema({
	title:      		  {type:String, required:true},
	userId:               {type:String, required:true},
	author_firstname:     {type:String, required:true},
	author_lastname:      {type:String, required:true},
	created_at:           {type:Date,   required:true},
	content:    		  {type:String, required:false},
	imageUrl:             {type:String, required:false},

});



module.exports = mongoose.model('Post', postSchema);