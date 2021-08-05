const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register',userController.regValidation,userController.register)
router.post('/login',userController.loginValidation,userController.login)

module.exports = router

