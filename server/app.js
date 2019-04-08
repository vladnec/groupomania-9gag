const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const config = require('./config/config');

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

app.get('/home', (req,res)=>{
	res.send({
		message:"test"
	});
});


module.exports = app;