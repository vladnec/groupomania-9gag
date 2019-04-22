const WrittenPost = require('../models/writtenPost');

exports.createWrittenPost = (req, res, next) => {
  const writtenPost = new WrittenPost({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    author_firstname: req.body.author_firstname,
    author_lastname: req.body.author_lastname
  });
  writtenPost.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getWrittenPosts = (req,res,next) => {
	WrittenPost.find().then(
		(writtenPosts) => {
			res.status(200).json(writtenPosts);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error:error
			});
		}
	);
};