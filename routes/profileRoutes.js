const express = require('express');
const router = express.Router()
const profileController = require('../controllers/profileController')
const auth = require('../utils/auth');

router.post('/updateName',auth, profileController.updateName)
router.post('/updatePassword',[auth, profileController.updatePasswordValidations],profileController.updatePassword)

module.exports = router;