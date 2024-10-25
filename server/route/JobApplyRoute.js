const express = require('express')
const JobApplyController = require('../controller/JobApplyController')
const router = express.Router()

router.get('',JobApplyController.index)
router.post('/create',JobApplyController.create)
router.get('/detail/:id',JobApplyController.detail)
router.patch('/update/:id',JobApplyController.update)
router.delete('/delete/:id',JobApplyController.delete)

module.exports = router