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
		let result = await findProject.findProject(req.body.projectId)
		let params = {
			name: req.body.name,
			description: req.body.description,
			maxDevices: req.body.maxDevices,
			projectArn: result.ARN,
			rules: []
		}
		let createdDevicePool = await devicefarm.createDevicePool(params)
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

/**
 * Get list of device pools available in the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listDevicePools = async (req, res) => {

	try {
		console.log("HERE")
		let result = await findProject.findProject(req.query.projectId)
		console.log("result", result)
		let params = {
			arn: result.ARN
		}
		let availableDevicePools = await devicefarm.listDevicePools(params)
		console.log(`availableDevicePools: ${availableDevicePools}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(availableDevicePools)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Delete a device pool based on ARN.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.deleteDevicePool = async (req, res) => {

	try {
		let params = {
			arn: req.query.arn
		}
		let deletedPool = await devicefarm.deleteDevicePool(params)
		console.log(`deletedPool: ${deletedPool}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(deletedPool)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Create upload on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createUpload = async (req, res) => {

	try {
		let createdUpload = await devicefarm.createUpload(req.body)
		console.log(`createdUpload: ${createdUpload}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(createdUpload)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.scheduleRun = async (req, res) => {

	try {
		const params = {
			appArn: req.body.appArn,
			projectArn: req.body.projectArn,
			devicePoolArn: req.body.devicePoolArn,
			test: {
				type: req.body.type
			}
		}
		let scheduledRun = await devicefarm.scheduleRun(params)
		console.log(`scheduledRun: ${scheduledRun}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(scheduledRun)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listUploads = async (req, res) => {

	try {
		const params = {
			arn: req.query.projectArn
		}
		let allUploads = await devicefarm.listUploads(params)
		console.log(`allUploads: ${allUploads}`)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allUploads)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}