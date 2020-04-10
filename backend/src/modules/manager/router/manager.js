`use strict`

import express from 'express'
let router = express.Router()
import managerController from '../controller/manager'
//import managerController from '../controller/manager2'
import upload from '../../../utils/upload'

//router.post('/addProject', createBucket, upload.single('file'), managerController.addProject)
router.post('/addProject', upload.single('file'), managerController.addProject)
//router.post('/addProject2',managerController.addProject2)
router.post('/viewProject', managerController.viewProject)
router.get('/allProjects/:managerId', managerController.allProjects)

module.exports = router
