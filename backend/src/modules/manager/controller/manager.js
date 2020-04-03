'use strict'

import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.addProject = async (req, res) => {

	try {
		console.log("addProject")
		let projectObj,
			newProject,
			createdProject
			
		projectObj= req.body;
		console.log(req.body);
		newProject = new Projects(projectObj);
		console.log("1");
		createdProject = await newProject.save();
		console.log("2");
		createdProject = createdProject.toJSON();
		console.log("3");
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
			.send(allProjects)
	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
