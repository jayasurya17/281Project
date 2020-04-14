'use strict'
const AWS = require('aws-sdk');
import fs from 'fs';
import config from '../../../../config';
import Projects from '../../../models/mongoDB/projects'
import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import s3 from '../../../utils/s3Operations';
const multiparty = require('multiparty');
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


exports.viewProject = async (req, res) => {

	try {

		let projectObj = req.body;
		console.log(req.body);

		AWS.config.update({
			secretAccessKey: config.awsKeysSrihari.AWS_SECRET_ACCESS,
			accessKeyId: config.awsKeysSrihari.AWS_ACCESSKEY,
			region: config.awsKeysSrihari.REGION
		})
		
		var s3 = new AWS.S3()

       console.log("req.body contains:",req.body);
		// 			var fileStream = fs.createWriteStream('test.png');
		// var s3Stream = s3.getObject({Bucket: projectObj.name, Key: 'catImage_1585898550190.png'}).createReadStream();
		var params1 = { Bucket: req.body.name };

		s3.listObjects(params1, function (err, data) {
			if (err) {
				console.log("Error", err);
			} else {
				console.log("Success", data);
				let sendingback = data.Contents;
				let responseData = [],
					index,
					url,
					key,
					bucket

				for (index in sendingback) {
					// Get the url for this
					bucket = req.body.name 
					key = sendingback[index].Key
					url = s3.getSignedUrl('getObject', { Bucket: bucket, Key: key })
					responseData.push({
						name: sendingback[index].Key,
						url : url
					})
				}
				return res
					.status(constants.STATUS_CODE.SUCCESS_STATUS)
					.send(responseData);

			}
		});

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.deleteProject = async (req, res) => {

	try {

		let projectObj = req;
		console.log("Her i am ",req.body);

		AWS.config.update({
			secretAccessKey: config.awsKeysSrihari.AWS_SECRET_ACCESS,
			accessKeyId: config.awsKeysSrihari.AWS_ACCESSKEY,
			region: config.awsKeysSrihari.REGION
		})
		
		var s3 = new AWS.S3()

       console.log("req.body,projectname contains:",req.body.projectname);
		// 			var fileStream = fs.createWriteStream('test.png');
		// var s3Stream = s3.getObject({Bucket: projectObj.name, Key: 'catImage_1585898550190.png'}).createReadStream();
		var params = { Bucket: req.body.projectname};

		s3.deleteBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket deleted Successfully');
});

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

