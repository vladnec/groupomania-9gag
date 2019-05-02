const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/posts');

router.get('/',   postCtrl.getPosts)
router.post('/' , multer, postCtrl.createPost)
router.get('/:id', postCtrl.getOnePost)


module.exports = router;