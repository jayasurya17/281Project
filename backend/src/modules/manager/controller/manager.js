'use strict'

import Projects from '../../../models/mongoDB/projects'
import Users from '../../../models/mongoDB/users'
import EmulatorRuns from '../../../models/mongoDB/emulatorRuns'
import constants from '../../../utils/constants'
import s3 from '../../../utils/s3Operations';
import devicefarm from '../../../utils/deviceFarmUtils';


/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */

exports.addProject = async (req, res) => {

	try {

		let projectObj,
			newProject,
			createdProject

		projectObj = req.body;

		var params = {
			name: projectObj.name
		}
		var deviceFarmObj = await devicefarm.createProject(params);
		projectObj['ARN'] = deviceFarmObj.project.arn;
		newProject = new Projects(projectObj);
		createdProject = await newProject.save();
		if (req.file) {
			await Projects.findByIdAndUpdate(
				createdProject._id,
				{
					$inc: {
						fileCount: 1
					}
				}
			)
			await Users.findByIdAndUpdate(
				createdProject.managerId,
				{
					$inc: {
						fileCount: 1
					}
				}
			)
			var resultURL = await s3.fileupload(String(createdProject._id), createdProject.managerId, req.file)
			console.log("resultURL", resultURL)
		}

		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(createdProject)

	} catch (error) {
		console.log(error.message)
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
exports.allProjects = async (req, res) => {

	try {
		let filter

		filter = {
			managerId: req.params.managerId
		}

		let allProjects = await Projects.find(filter)
		// console.log(allProjects)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(allProjects.reverse())
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.deleteProject = async (req, res) => {
	try {
		console.log("Her i am ", req.body);
		let projectObj = await Projects.findById(req.body.projectname)
		let userIDs = projectObj.acceptedUsers
		userIDs = projectObj.acceptedTesters
		userIDs.push(projectObj.managerId)
		let sendingback = await s3.getAllURLs(req.body.projectname, userIDs);
		console.log("Sending back", sendingback)
		let index,
			key,
			bucket

		for (index in sendingback) {
			// Get the url for this
			bucket = req.body.projectname
			key = sendingback[index].name
			await s3.deleteFile(bucket, key);
		}

		await s3.deleteBucket(req.body.projectname)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send("SUCCESS")

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.deleteFile = async (req, res) => {

	try {
		console.log("Deleting file", req.body)

		await Projects.findByIdAndUpdate(
			req.body.projectId,
			{
				$inc: {
					fileCount: -1
				}
			}
		)
		await Users.findByIdAndUpdate(
			req.body.userId,
			{
				$inc: {
					fileCount: -1
				}
			}
		)
		await s3.deleteFile(req.body.projectId, req.body.filename);
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send("Success")

	} catch (error) {
		console.log(error.message)
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
exports.getUsage = async (req, res) => {

	try {

		let allProjects = await Projects.find({
			managerId: req.params.managerId
		})
		let allRuns,
			runParams,
			allJobs,
			numberOfRuns = 0,
			numberOfDevices = 0,
			devicefarmRuntime = 0,
			numberOfEmulatorRuns = 0
			
		for (var projectDetails of allProjects) {
			let params = {
				arn: projectDetails.ARN
			}
			allRuns = await devicefarm.listRuns(params)
			numberOfRuns = allRuns.runs.length
			for(var run of allRuns.runs) {	
				if (run.deviceMinutes) {
					devicefarmRuntime += run.deviceMinutes.total
				}
				runParams = {
					arn: run.arn
				}	
				allJobs = await devicefarm.listJobs(runParams)
				numberOfDevices += allJobs.jobs.length
			}
			let allEmulatorRuns = await EmulatorRuns.find({
				projectId: projectDetails._id
			})
			numberOfEmulatorRuns = allEmulatorRuns.length
		}

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send({
				fileCount: projectDetails.fileCount,
				numberOfRuns: numberOfRuns,
				numberOfDevices: numberOfDevices,
				devicefarmRuntime: devicefarmRuntime,
				numberOfEmulatorRuns: numberOfEmulatorRuns,
				projectObj: projectDetails
			})

	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
