'use strict'

import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants'
import devicefarm from '../../../utils/deviceFarmUtils'
import findProject from '../../../utils/projectUtils'
import S3 from '../../../utils/s3Upload';
import Request from 'request';
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

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
			projectArn: result.ARN,
			rules: [{
				"attribute": "ARN", 
				"operator": "IN",
				"value": req.body.deviceARNs
			}]
		}
		let createdDevicePool = await devicefarm.createDevicePool(params)
		console.log("createdDevicePool", createdDevicePool)
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
 * Schedule Run on a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.scheduleRun = async (req, res) => {

	try {
		let uploadParams

		uploadParams = {
			projectArn: req.body.projectArn,
			type: req.body.fileType
		}
		let appUploadObj = await devicefarm.createUpload(uploadParams, req.files.file[0])

		uploadParams = {
			projectArn: req.body.projectArn,
			type: req.body.testType
		}
		let testUploadObj = await devicefarm.createUpload(uploadParams, req.files.testFile[0])
		const appUploadARN = appUploadObj.upload.arn
		const testUploadARN = testUploadObj.upload.arn
		let getAppUploadParams = {
			arn: appUploadARN
		}
		let getTestUploadParams = {
			arn: testUploadARN
		}
		let result1 = await devicefarm.getUpload(getAppUploadParams)
		let result2 = await devicefarm.getUpload(getTestUploadParams)
		while (result1.upload.status !== "SUCCEEDED" || result2.upload.status !== "SUCCEEDED") {
			console.log(result1.upload.status, result2.upload.status)
			await sleep(3000);
			result1 = await devicefarm.getUpload(getAppUploadParams)
			result2 = await devicefarm.getUpload(getTestUploadParams)
		}

		const params = {
			appArn: appUploadARN,
			devicePoolArn: req.body.devicePoolArn,
			executionConfiguration: {
				jobTimeoutMinutes: req.body.jobTimeoutMinutes
			},
			name: req.body.name,
			projectArn: req.body.projectArn,
			test: {
				testPackageArn: testUploadARN,
				type: req.body.testTypeName
			}
		}
		console.log("Params for scheduling run", params)
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

/**
 * List runs present in a project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.listRuns = async (req, res) => {

	try {
		const params = {
			arn: req.query.projectArn
		}
		let allRuns = await devicefarm.listRuns(params)
		console.log("allRuns: ", allRuns)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allRuns)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}