const AWS = require('aws-sdk');
const REGION = 'us-west-1';
import fs from 'fs';
///working
// Enter copied or downloaded access ID and secret key here
const ACCESS_KEY = 'AKIAIVH2MFPO6F4XKKJQ';
const SECRET_KEY = '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';

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION
})

var s3 = new AWS.S3()
//console.log("file name is :", req.body.file)
// s3.putObject({
// 	Bucket: projectObj._id,
// 	Key: files.file[0].originalFilename,
// 	Body: fs.readFileSync(String(files.file[0].path)),
// 	ACL: 'public-read'
// })

var createBucket = (bucketName) => {
    const params = {
        Bucket: bucketName,
        ACL: 'public-read',
        CreateBucketConfiguration: {
            // Set your region here
            LocationConstraint: "us-west-1"
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
    await createBucket(bucketName);
    const params = {
        Bucket: bucketName,  // Param 1 of the function
        Key: `${folderName}/${type}/${String(fileObj.originalFilename)}`, // Folder Name (Param 2) + Type (param 3) + file obj (param 4)
        ACL: 'public-read', // File name you want to save as in S3
        Body: fs.readFileSync(String(fileObj.path)) // Param 4
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
