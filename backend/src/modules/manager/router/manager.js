`use strict`

import express from 'express'
let router = express.Router()
import managerController from '../controller/manager'

router.post('/addProject', managerController.addProject)
router.get('/allProjects/:managerId', managerController.allProjects)

module.exports = router
