'use strict'

import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants'
import devicefarm from '../../../utils/deviceFarmUtils'
import findProject from '../../../utils/projectUtils'

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createDevicePool = async (req, res) => {

	try {
		console.log("req.body:", req.body)
		let result = await findProject.findProject(req.body.projectId)
		console.log(`result: ${result}`)
		let params = {
			name: req.body.name,
			description: req.body.description,
			maxDevices: req.body.maxDevices,
			projectArn: result.ARN,
			rules: []
		}
		let createdDevicePool = await devicefarm.createDevicePool(params)
		console.log(`createdDevicePool: ${createdDevicePool}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(createdDevicePool)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}