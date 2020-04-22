import Appium from './RunTest';
import multer from 'multer';
import constants from '../../../utils/constants';
import createEmulator from '../utils/CreateEmulator'
import emulatorRuns from '../../../models/mongoDB/emulatorRuns'

import s3upload from '../controller/s3FileUpload';

const fs = require('fs');





const AWS = require('aws-sdk');
const path = require("path");

import config from '../../../../config/index'

AWS.config.update({
	secretAccessKey: config.awsKeysSrihari.AWS_SECRET_ACCESS,
	accessKeyId: config.awsKeysSrihari.AWS_ACCESSKEY,
	region: config.awsKeysSrihari.REGION
})

var s3 = new AWS.S3()





/**
 * Returns list of all projects.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.fileUpload = async (req, res) => {
	try {
		console.log(req.data);

		const storage = multer.diskStorage({
			destination(req, file, cb) {
				cb(null, './src/apkStore');
			},
			filename(req, file, cb) {
				cb(null, `${file.originalname}`);
			},
		});

		const upload = multer({
			storage
		}).single('file');

		upload(req, res, (err) => {
			// console.log('In the saving part');
			if (err instanceof multer.MulterError) {
				return res.status(500);
			}
			if (err) {
				return res.status(500);
			}
			return res.status(200);
		});
		return res.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS).send('Create Run');
	} catch (error) {
		console.log(error);
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message);
	}
};

exports.createTest = async (req, res) => {
	try {


		let runobj = {
			...req.body.capabilities,
			userId: req.body.userId,
			userName: req.body.userName,
			projectId: req.body.projectId
		}

		let newRun = new emulatorRuns(runobj);
		let createdRun = await newRun.save();

		console.log(createdRun._id);


		if (req.body.capabilities.deviceName === 'emulator-5554') {
			createEmulator.createEmulator('Pixel_3a_API_27', 5554);
		}
		else if (req.body.capabilities.deviceName === 'emulator-5556') {
			createEmulator.createEmulator('Pixel_3a_API_27', 5556);
		}

		const uploadObj = {
			userId: req.body.userId,
			projectId: req.body.projectId,
			runId: createdRun._id
		}


		let appiumobj = {
			capabilities: req.body.capabilities,
			runId: createdRun._id
		}

		await Appium.runAppium(appiumobj);
		await s3upload.fileUpload(uploadObj);

		return res.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS).send(createdRun._id);
	} catch (error) {
		console.log(error);
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message);
	}
};


