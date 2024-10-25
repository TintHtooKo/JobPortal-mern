const express = require('express')
const JobPostController = require('../controller/JobPostController')
const router = express.Router()

router.get('',JobPostController.index)
router.post('/create',JobPostController.create)
router.get('/detail/:id',JobPostController.detail)
router.patch('/update/:id',JobPostController.update)
router.delete('/delete/:id',JobPostController.delete)

module.exports = router