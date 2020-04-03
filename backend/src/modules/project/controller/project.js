'use strict'

import Users from '../../../models/mongoDB/users'
import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants'

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
