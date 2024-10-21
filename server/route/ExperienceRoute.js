const express = require('express')
const ExperienceController = require('../controller/ExperienceController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const router = express.Router()

router.get('',AuthMiddleware,ExperienceController.index)
router.post('/create',AuthMiddleware,ExperienceController.create)
router.get('/detail/:id',AuthMiddleware,ExperienceController.detail)
router.delete('/delete/:id',AuthMiddleware,ExperienceController.delete)
router.patch('/update/:id',AuthMiddleware,ExperienceController.update)

module.exports = router