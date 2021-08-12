const express = require('express');
const router = express.Router()
const postController = require('../controllers/postController')
const auth = require('../utils/auth');
router.post('/create_post',auth, postController.createPost)
router.post('/update',[auth, postController.updateValidations],postController.updatePost)
router.get('/posts/:id/:page',auth,postController.fetchPosts)
router.get('/post/:id',auth,postController.fetchPost)

module.exports = router;