`use strict`

import express from 'express'
let router = express.Router()
import deviceFarmController from '../controller/deviceFarm'

router.post('/createdevicepool', deviceFarmController.createDevicePool)
router.get('/listDevicePools', deviceFarmController.listDevicePools)

module.exports = router
