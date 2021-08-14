const express = require('express');
const router = express.Router()
const postController = require('../controllers/postController')
const auth = require('../utils/auth');
router.post('/create_post',auth, postController.createPost)
router.post('/update',[auth, postController.updateValidations],postController.updatePost)
router.get('/posts/:id/:page',auth,postController.fetchPosts)
router.get('/post/:id',auth,postController.fetchPost)
router.post('/updateImage',auth,postController.updateImage)
router.get('/delete/:id',auth,postController.deletePost)
router.get('/home/:page',postController.home)
router.get('/details/:id',postController.detail)
router.post('/comment',auth, postController.postComment)

module.exports = router;