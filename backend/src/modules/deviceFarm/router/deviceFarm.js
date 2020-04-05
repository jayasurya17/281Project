'use strict'

import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
const multiparty = require('multiparty');

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
			console.log(projectObj);
			newProject = new Projects(projectObj);
			createdProject = await newProject.save();
			createdProject = createdProject.toJSON();
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