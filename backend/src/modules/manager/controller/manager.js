'use strict'

import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants'
const multiparty = require('multiparty');
import devicefarm from '../../../utils/deviceFarmUtils';

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.addProject = async (req, res) => {

	try {
		var form = new multiparty.Form();
		var newObj = {}
		form.parse(req, async function(err, fields, files) {
			let temp = newObj
			Object.keys(fields).forEach(function(name) {
				let that = temp
				let key = String(name), value = String(fields[name])
				that[key] = value
			});
			
			let projectObj,
			newProject,
			createdProject
			
			projectObj= temp;
			
			var params = {
				name : projectObj.name
			}

			var deviceFarmObj = await devicefarm.createProject(params);
			projectObj['ARN'] = deviceFarmObj.project.arn;
			newProject = new Projects(projectObj);
			createdProject = await newProject.save();
			return res
				.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
				.send(createdProject)
		});

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
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
