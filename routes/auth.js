const express = require('express')
const router = express.Router()

const authController = require('../controllers/authControllers')
// const userController = require('../controllers/userControl')

router.post('/register', authController.validateSign, authController.register)
router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)
router.get('/dashboard', authController.authorize,authController.tokenVerified)
 
module.exports = router