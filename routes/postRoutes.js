const express = require('express');
const router = express.Router()
const postController = require('../controllers/postController')
const auth = require('../utils/auth');
router.post('/create_post',auth, postController.createPost)
router.get('/posts/:id/:page',auth,postController.fetchPosts)

module.exports = router;