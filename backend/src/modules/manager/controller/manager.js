'use strict'

import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants'
import s3 from '../../../utils/s3Upload';
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
		var resultURL = await s3.fileupload(String(createdProject._id), createdProject.managerId, "Regular", req.file)
		console.log("resultURL", resultURL)
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
		console.log(projectObj);

		const s3 = new AWS.S3({
			accessKeyId: ACCESS_KEY,
			secretAccessKey: SECRET_KEY
		});


		// 			var fileStream = fs.createWriteStream('test.png');
		// var s3Stream = s3.getObject({Bucket: projectObj.name, Key: 'catImage_1585898550190.png'}).createReadStream();
		var params1 = { Bucket: projectObj.name };

		s3.listObjects(params1, function (err, data) {
			if (err) {
				console.log("Error", err);
			} else {
				console.log("Success", data);
				let sendingback = data;
				return res
					.status(constants.STATUS_CODE.SUCCESS_STATUS)
					.send(sendingback);

			}
		});
		// s3.getSignedUrl('getObject', { Bucket: projectObj.name, Key: 'abcd.txt' },function(err)
		// {
		// 	if (err) {
		// 		console.log("Error", err);
		// 	} else {
		// 		console.log(
		// 			`Hi The URL is ${s3.getSignedUrl('getObject', { Bucket: projectObj.name, Key: 'abcd.txt' })}`
		// 		  )
		// 		  let returningvar=s3.getSignedUrl('getObject', { Bucket: projectObj.name, Key: 'abcd.txt' })
		// 		  return res
		// 		  .send(returningvar)
		// 		}
		// });






		// Listen for errors returned by the service
		// s3Stream.on('error', function(err) {
		//     // NoSuchKey: The specified key does not exist
		//     console.error(err);
		// });

		// s3Stream.pipe(fileStream).on('error', function(err) {
		//     // capture any errors that occur when writing data to the file
		//     console.error('File Stream:', err);
		// }).on('close', function() {
		//     console.log('Done.');
		// });

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}


exports.viewFile = async (req, res) => {

	try {

		var form = new multiparty.Form();
		var newObj = {}
		form.parse(req, async function (err, fields, files) {
			let temp = newObj
			Object.keys(fields).forEach(function (name) {
				let that = temp
				let key = String(name), value = String(fields[name])
				that[key] = value
			});

			let projectObj,
				newProject,
				createdProject

			projectObj = temp;
			console.log(projectObj);

			const s3 = new AWS.S3({
				accessKeyId: ACCESS_KEY,
				secretAccessKey: SECRET_KEY
			});


			var fileStream = fs.createWriteStream(projectObj.filename);
			var s3Stream = s3.getObject({ Bucket: projectObj.name, Key: projectObj.filename }).createReadStream();




			// Listen for errors returned by the service
			s3Stream.on('error', function (err) {
				// NoSuchKey: The specified key does not exist
				console.error(err);
			});

			s3Stream.pipe(fileStream).on('error', function (err) {
				// capture any errors that occur when writing data to the file
				console.error('File Stream:', err);
			}).on('close', function () {
				console.log('Done.');
				return res
				return res
				return res
					.status(constants.STATUS_CODE.SUCCESS_STATUS)
					.send(constants.MESSAGES.FILE_DOWNLOADED)
			});


		});

	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

