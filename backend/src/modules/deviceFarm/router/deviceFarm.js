`use strict`

import express from 'express'
let router = express.Router()
import deviceFarmController from '../controller/deviceFarm'
import upload from '../../../utils/upload'

router.post('/createdevicepool', deviceFarmController.createDevicePool)
router.get('/listDevicePools', deviceFarmController.listDevicePools)
router.get('/listUploads', deviceFarmController.listUploads)
router.get('/listRuns', deviceFarmController.listRuns)
router.delete('/deletepool', deviceFarmController.deleteDevicePool)
router.post('/schedulerun', upload.fields([{ name: 'file'} , { name: 'testFile'}]), deviceFarmController.scheduleRun)
router.delete('/stopRun', deviceFarmController.stopRun)
router.delete('/deleteRun', deviceFarmController.deleteRun)

module.exports = router
