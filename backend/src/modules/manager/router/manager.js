`use strict`

import express from 'express'
let router = express.Router()
import managerController from '../controller/manager'

router.post('/addProject', managerController.addProject)

module.exports = router
