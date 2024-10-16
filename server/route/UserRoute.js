const express = require('express')
const userController = require('../controller/UserController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const router = express.Router()

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/logout',userController.logout)
router.get('',AuthMiddleware,userController.userList)
router.get('/me',AuthMiddleware,userController.me)
router.patch('/edit',AuthMiddleware,userController.userEdit)

module.exports = router