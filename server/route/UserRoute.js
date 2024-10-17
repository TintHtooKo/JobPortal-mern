const express = require('express')
const userController = require('../controller/UserController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const cvUpload = require('../helper/cvUpload')
const router = express.Router() 

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/logout',userController.logout)
router.get('',AuthMiddleware,userController.userList)
router.get('/me',AuthMiddleware,userController.me)
router.patch('/edit',AuthMiddleware,userController.userEdit)
router.post('/upload/cv',cvUpload.single('cv'),AuthMiddleware,userController.uploadCv)
router.patch('/change/email',AuthMiddleware,userController.changeEmail)
router.post('/change/password',AuthMiddleware,userController.changePassword)
router.delete('/delete/:id',AuthMiddleware,userController.userDelete)

module.exports = router