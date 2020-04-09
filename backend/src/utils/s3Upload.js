const AWS = require('aws-sdk');
import fs from 'fs';
import config from '../../config/index';

AWS.config.update({
    secretAccessKey: config.awsKeysSrihari.AWS_SECRET_ACCESS,
    accessKeyId: config.awsKeysSrihari.AWS_ACCESSKEY,
	region: config.awsKeysSrihari.REGION
})

var s3 = new AWS.S3()

var createBucket = (bucketName) => {
    const params = {
        Bucket: bucketName,
        ACL: 'public-read',
        CreateBucketConfiguration: {
            // Set your region here
            LocationConstraint: config.awsKeysSrihari.REGION
        }
    };
    console.log("VREATING A BUCKET", params)
    return new Promise((resolve, reject) => {
        s3.createBucket(params, function (err, data) {
            if (err) {
                console.log("BUCKET ALREADY OWNED BY YOU");
            }
            else {
                console.log('Bucket Created Successfully', data.Location);
            }
            resolve();
        })
    });
}
exports.fileupload = async (bucketName, folderName, type, fileObj) => {
    console.log("PARAMS", bucketName, folderName, type, fileObj)
    await createBucket(bucketName);
    const params = {
        Bucket: bucketName,  // Param 1 of the function
        Key: `${folderName}/${type}/${String(fileObj.originalFilename)}`, // Folder Name (Param 2) + Type (param 3) + file obj (param 4)
        ACL: 'public-read', // File name you want to save as in S3
        Body: new Buffer(fileObj.buffer) // Param 4
    };
    console.log("PARAMS FOR UPLOADEING", params)

    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        })
        .promise()
            .then(() => {
                var createdURL = s3.getSignedUrl('getObject', { Bucket: bucketName, Key: String(fileObj.originalFilename) })
                console.log(`The URL is ${createdURL}`) // Return value of the function
                resolve(createdURL)
            })
    })

}
