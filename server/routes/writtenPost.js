const express = require('express');
const router = express.Router();

const writtenPostCtrl = require('../controllers/writtenPost');

router.post('/', writtenPostCtrl.createWrittenPost)
router.get('/', writtenPostCtrl.getWrittenPosts)

module.exports = router;