'use strict'

import mongoose from 'mongoose'
import Users from '../../../models/mongoDB/users'
import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants'
import devicefarm from '../../../utils/deviceFarmUtils'
import S3 from '../../../utils/s3Operations'

/**
 * Returns list of all projects created by the manager.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getDetails = async (req, res) => {

	try {

		let projectDetails = await Projects.findById(req.params.projectId)
		
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(projectDetails)

	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Returns list of all projects created by the manager.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getRequestedUsers = async (req, res) => {

	try {

		let projectDetails = await Projects.findById(req.params.projectId)
		let requestedUserIds = projectDetails.requestedTesters
		let requestedUsers = [],
			userObj
		for ( var index in requestedUserIds ) {
			userObj = await Users.findById(requestedUserIds[index]);
			delete userObj.password;
			requestedUsers.push(userObj);
		}
		var returnObj = {
			requestedUsers : requestedUsers
		}
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(returnObj)
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Change status of user from requested to accepted in the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.acceptUser = async (req, res) => {

	try {
		let projectObj = await Projects.findById(req.body.projectId)
		if (projectObj.acceptedTesters.includes(req.body.userId)) {
			return res
				.status(constants.STATUS_CODE.NO_CONTENT_STATUS)
				.send("Already accepted")
		}

		await Projects.findByIdAndUpdate(
			req.body.projectId,
			{ 
				$pull : {
					requestedTesters : req.body.userId
				},
				$push : {
					acceptedTesters : req.body.userId
				}
			}
		)

		await Users.findByIdAndUpdate(
			req.body.userId,
			{ 
				$pull : {
					requestedProjects : req.body.projectId
				},
				$push : {
					acceptedProjects : req.body.projectId
				}
			}
		)


		return res
			.status(constants.STATUS_CODE.NO_CONTENT_STATUS)
			.json()
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Change status of user from requested to rejected in the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.rejectUser = async (req, res) => {

	try {
		let projectObj = await Projects.findById(req.body.projectId)
		if (projectObj.rejectedTesters.includes(req.body.userId)) {
			return res
				.status(constants.STATUS_CODE.NO_CONTENT_STATUS)
				.send("Already rejected")
		}

		await Projects.findByIdAndUpdate(
			req.body.projectId,
			{ 
				$pull : {
					requestedTesters : req.body.userId
				},
				$push : {
					rejectedTesters : req.body.userId
				}
			}
		)

		await Users.findByIdAndUpdate(
			req.body.userId,
			{ 
				$pull : {
					requestedProjects : req.body.projectId
				},
				$push : {
					rejectedProjects : req.body.projectId
				}
			}
		)


		return res
			.status(constants.STATUS_CODE.NO_CONTENT_STATUS)
			.json()
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


/**
 * Post new announcement to the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.announcement = async (req, res) => {

	try {
		console.log(req.body)
		const newAnnouncement = {
			text : req.body.announcement
		}
		await Projects.findByIdAndUpdate(
			req.body.projectId,
			{ 
				$push : {
					announcements :  newAnnouncement
				}
			}
		)


		return res
			.status(constants.STATUS_CODE.NO_CONTENT_STATUS)
			.json()
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


/**
 * Get all devices of the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllDevices = async (req, res) => {

	try {

		let projectObj = await Projects.findById(req.query.projectId)
		var params = {
			arn : projectObj.ARN
		}
		let allDevices = await devicefarm.listDevices(params)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allDevices)
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


/**
 * Upload a file to the project.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.uploadFile = async (req, res) => {

	try {

		console.log(req.body)
		console.log(req.file)
		let result = await S3.fileupload(req.body.projectId, req.body.userId, req.file)

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(result)
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


exports.getFilesInProject = async (req, res) => {

	try {
		let projectObj = await Projects.findById(req.params.projectId)
		let userIDs = []
		if (String(projectObj.managerId) == req.params.userId) {
			userIDs = projectObj.acceptedTesters
			userIDs.push(req.params.userId)
		} else {
			userIDs = [req.params.userId, String(projectObj.managerId)]
		}
		let listOfURLs = await S3.getAllURLs(req.params.projectId, userIDs)
		let userFiles = {},
			index,
			userId,
			userObj
		for (index in userIDs) {
			userObj = await Users.findById(userIDs[index])
			userFiles[userIDs[index]] = {
				name: userObj.name,
				files: []
			}
		}
		for (index in listOfURLs) {
			userId = listOfURLs[index].name.split("/")[0]
			userFiles[userId].files.push(listOfURLs[index])
		}


		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(userFiles)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


exports.deleteProject = async (req, res) => {

	try {

		let projectId = req.params.projectId
		let projectObj = await Projects.findById(projectId)
		await Projects.deleteOne({
			_id : projectId
		})
		let index 
		for (index in projectObj.requestedTesters) {
			await Users.findByIdAndUpdate(
				projectObj.requestedTesters[index],
				{
					$pull: {
						requestedProjects: projectId
					}
				}
			)
		}
		for (index in projectObj.acceptedTesters) {
			await Users.findByIdAndUpdate(
				projectObj.acceptedTesters[index],
				{
					$pull: {
						acceptedProjects: projectId
					}
				}
			)
		}
		for (index in projectObj.rejectedTesters) {
			await Users.findByIdAndUpdate(
				projectObj.rejectedTesters[index],
				{
					$pull: {
						rejectedProjects: projectId
					}
				}
			)
		}

		console.log(projectObj)
		if (projectObj.ARN != undefined) {
			const params = {
				arn: projectObj.ARN
			}
			await devicefarm.deleteProject(params)
		}

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(projectObj)

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
