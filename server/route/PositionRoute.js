const express = require('express')
const positionController = require('../controller/PositionController')
const router = express.Router()

router.get('/',positionController.index)
router.post('/create',positionController.create)
router.get('/detail/:id',positionController.detail)
router.delete('/delete/:id',positionController.delete)

module.exports = router