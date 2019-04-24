const Post = require('../models/post');

exports.createPost = (req, res, next) => {

    const url = req.protocol + '://' +req.get('host');

      if(req.file){
        const post = new Post({
          title:req.body.title,
          userId:req.body.userId,
          author_firstname  :req.body.author_firstname ,
          author_lastname :req.body.author_lastname,
          imageUrl : url + '/images/' + req.file.filename
        });
          post.save().then(
              () => {
                res.status(201).json({
                  message:'Post with media saved successfully '
                })
              }
          ).catch(
                (error) => {
                res.status(400).json({
                  error: error
                });
              }
            );
      } else {
        const post = new Post({
          title:req.body.title,
          userId:req.body.userId,
          author_firstname  :req.body.author_firstname ,
          author_lastname :req.body.author_lastname,
          content:req.body.content,
        });
          post.save().then(
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
};

exports.getPosts = (req,res,next) => {
	Post.find().then(
		(posts) => {
			res.status(200).json(posts);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error:error
			});
		}
	);
};