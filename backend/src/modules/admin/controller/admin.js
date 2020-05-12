
import Users from '../../../models/mongoDB/users';
import Projects from '../../../models/mongoDB/projects'
import constants from '../../../utils/constants';
import getRuns from '../../appiumRuns/controller/getRuns'
import Runs from '../../../models/mongoDB/runs'
import EmulatorRuns from '../../../models/mongoDB/emulatorRuns'
import PreBookedPools from '../../../models/mongoDB/preBookedPools'
import devicefarm from '../../../utils/deviceFarmUtils';

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createAdmin = async (req, res) => {
	let createdUser

	let filter = {}
	try {
		filter.email = req.body.email
		const user = await Users.findOne(filter)
		if (user) {
			return res
				.status(constants.STATUS_CODE.CONFLICT_ERROR_STATUS)
				.send(constants.MESSAGES.USER_ALREADY_EXISTS)
		}

        let userObj = req.body
        userObj.type = "Admin"
		let newUser = new Users(userObj)
		createdUser = await newUser.save()
		createdUser = createdUser.toJSON()
		delete createdUser.password
		return res
			.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS)
			.send(createdUser)
	} catch (error) {
		console.log(`Error while creating user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Login user and send auth token and user details in response.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.loginAdmin = async (req, res) => {
	try {
		var user

		var isAuth = false
		user = await Users.findOne({ email: req.body.email })

		if (user) {
			const validate = await user.validatePassword(req.body.password)
			if (validate) {
				user = user.toJSON()
				delete user.password
				isAuth = true
				return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(user)
			}
		}
		if (!isAuth) {
			return res
				.status(constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS)
				.send(constants.MESSAGES.AUTHORIZATION_FAILED)
		}
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get all projects in the system.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllProjects = async (req, res) => {
	try {
        let allProjects = await Projects.find({})
        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send(allProjects)
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get all projects in the system.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllManagers = async (req, res) => {
	try {

        let allManagers = await Users.find({
            type: 'Manager'
        })
        var managerData = [],
            managerObj
        for (var index in allManagers) {
            managerObj = allManagers[index].toJSON()
            let allProjects = await Projects.find({
                managerId: managerObj._id
            })
            delete managerObj.password
            delete managerObj.type
            delete managerObj.isActive
            managerObj.projectCount = allProjects.length
            managerData.push(managerObj)
        }
        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send(managerData)
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get all projects in the system.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getAllTesters = async (req, res) => {
	try {

        let allTesters = await Users.find({
			type: 'Tester'
        })
        
        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send(allTesters)
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}

/**
 * Get all projects in the system.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.blockTester = async (req, res) => {
	try {

        await Users.findByIdAndUpdate(
			req.body.userId,
			{
            	isActive: false
			}
		)
        
        return res
            .status(constants.STATUS_CODE.SUCCESS_STATUS)
            .send("SUCCESS")
	} catch (error) {
		console.log(`Error while logging in user ${error}`)
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

		let allTesters = await Users.find({
			type: "Tester"
		})

		let allManagers = await Users.find({
			type: "Manager"
		})

		let allProjects = await Projects.find()
		let allRuns,
			runParams,
			allJobs,
			numberOfRuns = 0,
			numberOfDevices = 0,
			devicefarmRuntime = 0,
			numberOfEmulatorRuns = 0,
			emulatorRunTime = 0

		for (var projectDetails of allProjects) {

			let timed = await getRuns.getRunTime(projectDetails._id)
			timed = timed / 60000
			emulatorRunTime += timed


			let params = {
				arn: projectDetails.ARN
			}
			allRuns = await devicefarm.listRuns(params)
			
			for (var run of allRuns.runs) {
				let runObj = await Runs.findOne({ ARN: run.arn })
				
				if (!runObj) {
					continue
				}
				numberOfRuns += 1
				console.log(numberOfRuns, runObj)
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
		
		let preBookedTime = 0,
			allPools = await PreBookedPools.find(),
			poolObj,
			startTime,
			endTime,
			difference

		for (poolObj of allPools) {
			startTime = poolObj.createTime
			if (poolObj.deleteTime) {
				endTime = poolObj.deleteTime
			} else {
				endTime = Date.now()
			}
			difference = (endTime - startTime) / (1000 * 60)
			preBookedTime += difference
		}

		return res
			.status(constants.STATUS_CODE.SUCCESS_STATUS)
			.send({
				numberOfTesters: allTesters.length,
				numberOfManagers: allManagers.length,
				numberOfProjects: allProjects.length,
				fileCount: projectDetails.fileCount,
				numberOfRuns: numberOfRuns,
				numberOfDevices: numberOfDevices,
				devicefarmRuntime: devicefarmRuntime.toFixed(2),
				numberOfEmulatorRuns: numberOfEmulatorRuns,
				projectObj: projectDetails,
				preBookedTime: preBookedTime.toFixed(2),
				emulatorRunTime: emulatorRunTime.toFixed(2)
			})

	} catch (error) {
		return res
			.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
			.send(error.message)
	}
}
