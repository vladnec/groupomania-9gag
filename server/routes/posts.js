const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/posts');

router.get('/',   postCtrl.getPosts)
router.post('/' , multer, postCtrl.createPost)


module.exports = router;