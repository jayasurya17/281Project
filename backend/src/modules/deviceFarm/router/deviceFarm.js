`use strict`

import express from 'express'
let router = express.Router()
import deviceFarmController from '../controller/deviceFarm'

router.post('/createdevicepool', deviceFarmController.createDevicePool)
router.post('/createupload', deviceFarmController.createUpload)
router.get('/listDevicePools', deviceFarmController.listDevicePools)
router.get('/listUploads', deviceFarmController.listUploads)
router.delete('/deletepool', deviceFarmController.deleteDevicePool)
router.post('/schedulerun', deviceFarmController.scheduleRun)

module.exports = router
