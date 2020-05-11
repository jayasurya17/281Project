import Projects from '../models/mongoDB/projects'
import PreBookedPools from '../models/mongoDB/preBookedPools'
import DeviceFarmUtils from './deviceFarmUtils'
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


exports.stopActiveRuns = (projectARN, poolARN) => {

    return new Promise( async (resolve) => {
        let project = await Projects.findOne({
            ARN: projectARN
        })
        let projectId = project._id
        let pools = await PreBookedPools.find({
            projectId: projectId,
            isDeleted: false
        }) 
        let runARN
        
        for (var pool of pools) {
            if (pool.arn !== poolARN) {
                continue
            }

            runARN = pool.runArn
            if (runARN == undefined || runARN == null) {
                continue
            }

            const runParams = {
                arn: runARN
            }
            let runObj = await DeviceFarmUtils.getRun(runParams)
            
            if (runObj.run.status != "COMPLETED") {
                await DeviceFarmUtils.stopRun(runParams)
            }

            while (runObj.run.status != "COMPLETED") {
                sleep(30000)
                runObj = await DeviceFarmUtils.getRun(runParams)
                console.log("Sleeping")
            }
        }

        resolve(true)
    })
} 