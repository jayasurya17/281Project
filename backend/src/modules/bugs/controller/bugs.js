'use strict'

import mongoose from 'mongoose';
import Bugs from '../../../models/mongoDB/bugs'
import Users from '../../../models/mongoDB/users';
import constants from '../../../utils/constants';

exports.createBug = async (req, res) => {
	try {
        var bugObject = {
            name: req.body.name,
            subject : req.body.subject,
            projectId : req.body.projectId,
            status : req.body.status,
            severity : req.body.severity,
            tester : req.body.tester
        }
        var newBug = new Bugs(bugObject);
        var createdBug = await newBug.save();
        return res
                .status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
                .send(createdBug);
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getAllBugs = async (req, res) => {
	console.log("req here is ",req.params.userId);
	try {
        let details = await Users.findById(
			mongoose.Types.ObjectId(req.params.userId)
		)
		if (details) {
			let projects = details.toJSON().acceptedProjects;
			console.log(projects)
            let bugs = await Bugs.find({
                projectId : {
                    $in : projects
                }
			})
			console.log(bugs);
            return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send(bugs)
        }
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getBug = async (req, res) => {

	try {
		let filter = {
			_id: req.params.bugId
		}
		let bug = await Bugs.find(filter)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(bug[0])
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.updateBug = async (req, res) => {
	try {
		await Bugs.findByIdAndUpdate(
            { _id : req.params.bugId},
			{
                    name: req.body.name,
                    subject : req.body.subject,
                    severity : req.body.severity,
                    status : req.body.status,
                    tester : req.body.tester
			},
			function(err, result) {
				if (err) {
				  res.send(err);
				} else {
				  res.status(200).send(result)
				}
			  }
		)
	} catch (error) {
		console.log(`Error while updating bug: ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.getBugsInProject = async (req, res) => {

	try {
		let filter = {
			projectId: req.params.projectId
		}
		let bugs = await Bugs.find(filter)
		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send(bugs)
	} catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

exports.deleteBug = async (req,res) => {
	try{
		Bugs.remove({ _id: req.body.bugId }, 
			function(err, result) {
				if (err) {
				res.send(err);
				} else {
				res.status(200).send()
				}
			  }
		)
	}
	catch (error) {
		console.log(error.message)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
