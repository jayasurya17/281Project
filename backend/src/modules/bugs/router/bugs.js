`use strict`

import express from 'express'
let router = express.Router()
import bugsController from '../controller/bugs'

router.post('/createBug', bugsController.createBug)
router.get('/all/:userId', bugsController.getAllBugs)
router.get('/viewBug/:bugId', bugsController.getBug)
router.post('/updateBug/:bugId',bugsController.updateBug)
router.delete('/deleteBug',bugsController.deleteBug)
router.put('/allByProjectId/:projectId',bugsController.getBugsInProject)
router.post('/getErrorReports',bugsController.getErrorReport)

module.exports = router
