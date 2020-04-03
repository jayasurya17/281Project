`use strict`

import express from 'express'
let router = express.Router()
import projectController from '../controller/project'

router.get('/details/:projectId', projectController.getDetails)
router.get('/requested/:projectId', projectController.getRequestedUsers)
router.post('/acceptUser', projectController.acceptUser)
router.post('/rejectUser', projectController.rejectUser)
router.post('/announcement', projectController.announcement)

module.exports = router
