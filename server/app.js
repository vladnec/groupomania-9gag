const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');

const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');

const app = express();




mongoose.connect(`mongodb+srv://vlad:${config.password}@cluster0-kkfup.mongodb.net/test?retryWrites=true`)
	.then(()=>{
		console.log('succesfully connected to MongoDB Atlas!');
	})
	.catch( () => {
		console.log('Unable to connect to MongoDB Atlas!');
		console.error(error);
	});
mongoose.set('useFindAndModify', false);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/auth', userRoutes);
app.use('/post', postRoutes);

app.use(function(err,req,res,next){
	if(err.code === "LIMIT_FILE_TYPES"){
		res.status(422).json({
			error:"Only images are allowed"
		});
		return;
	}
	if( err.code === "LIMIT_FILE_SIZE"){
		res.status(422).json({
			error:"error : Too large. Max size is 5MB"
		});
		return;
	}
});

module.exports = app;