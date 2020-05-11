import cron from "node-cron"
import PreBookedPools from '../models/mongoDB/preBookedPools'
import Projects from '../models/mongoDB/projects'
import DeviceFarmUtils from './DeviceFarmUtils'
const testFile = 'src/utils/res/zip-with-dependencies123.zip'
const androidFile = 'src/utils/res/TapTapSee.apk'
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

cron.schedule("0 */1 * * * *", async () => {

    try {
        console.log("Cron job running")
        let allDevicePools = await PreBookedPools.find({
            isDeleted: false
        })
        let runStatus
        for (var pool of allDevicePools) {

            // Get current run details
            if (pool.runArn) {
                runStatus = await DeviceFarmUtils.getRun({
                    arn: pool.runArn
                })
            }

            // If run is completed
            if (pool.runArn == undefined || pool.runArn == null || runStatus.run.status === "COMPLETED") {

                if (runStatus == null && pool.uploadComplete === true) {
                    continue
                }

                await PreBookedPools.findByIdAndUpdate(
                    pool._id,
                    {
                        uploadComplete: true
                    }
                )

                // Start another run with the same pool
                let projectObj = await Projects.findById(pool.projectId)
                let uploadParams

                uploadParams = {
                    projectArn: projectObj.ARN,
                    type: "ANDROID_APP"
                }
                let appUploadObj = await DeviceFarmUtils.createPreBookedUpload(uploadParams, androidFile, "TapTapSee.apk")
                uploadParams = {
                    projectArn: projectObj.ARN,
                    type: "APPIUM_JAVA_TESTNG_TEST_PACKAGE"
                }
                let testUploadObj = await DeviceFarmUtils.createPreBookedUpload(uploadParams, testFile, "zip-with-dependencies123.zip")
                const appUploadARN = appUploadObj.upload.arn
                const testUploadARN = testUploadObj.upload.arn
                let getAppUploadParams = {
                    arn: appUploadARN
                }
                let getTestUploadParams = {
                    arn: testUploadARN
                }

                let result1 = await DeviceFarmUtils.getUpload(getAppUploadParams)
                let result2 = await DeviceFarmUtils.getUpload(getTestUploadParams)
                while (result1.upload.status !== "SUCCEEDED" || result2.upload.status !== "SUCCEEDED") {
                    await sleep(3000);
                    result1 = await DeviceFarmUtils.getUpload(getAppUploadParams)
                    result2 = await DeviceFarmUtils.getUpload(getTestUploadParams)
                    console.log("Sleeping", result1.upload.status, result2.upload.status)
                }

                const params = {
                    appArn: appUploadARN,
                    devicePoolArn: pool.arn,
                    executionConfiguration: {
                        jobTimeoutMinutes: 5
                    },
                    name: "PreBookedRun",
                    projectArn: projectObj.ARN,
                    test: {
                        testPackageArn: testUploadARN,
                        type: "APPIUM_JAVA_TESTNG"
                    }
                }

                let scheduledRun = await DeviceFarmUtils.scheduleRun(params)
                console.log("preBookedRun:", scheduledRun)

                await PreBookedPools.findByIdAndUpdate(
                    pool._id,
                    {
                        runArn: scheduledRun.run.arn
                    }
                )
            }

        }

    } catch (err) {
        console.log(err)
    }

}); 