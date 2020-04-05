`use strict`

import express from 'express'
let router = express.Router()
import appiumController from '../controller/appium'

router.post('/createtest', appiumController.createTest);
router.post('/fileUpload', appiumController.fileUpload);

module.exports = router
