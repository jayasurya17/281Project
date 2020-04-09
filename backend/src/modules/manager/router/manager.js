`use strict`

import express from 'express'
let router = express.Router()
import managerController from '../controller/manager'
import { upload, createBucket } from '../../../utils/s3Upload'

//router.post('/addProject', createBucket, upload.single('file'), managerController.addProject)
router.post('/addProject',managerController.addProject)
//router.post('/addProject2',managerController.addProject2)
router.post('/viewProject', managerController.viewProject)
router.post('/viewFile', managerController.viewFile)
router.get('/allProjects/:managerId', managerController.allProjects)

module.exports = router
