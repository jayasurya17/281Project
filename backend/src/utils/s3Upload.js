const AWS = require('aws-sdk');
import multerS3 from 'multer-s3';
import multer from 'multer';
const REGION = 'us-west-1';
///working
// Enter copied or downloaded access ID and secret key here
const ID = 'AKIAIVH2MFPO6F4XKKJQ';
const SECRET = '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';

// var FILE_NAME = projectObj.file;
// console.log("Hi" + FILE_NAME);
// var BUCKET_NAME = String(createdProject._id);
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});



// const localImage = FILE_NAME;
// const imageRemoteName = FILE_NAME;

// s3.putObject({
//     Bucket: BUCKET_NAME,
//     Body: fs.readFileSync(localImage),
//     Key: imageRemoteName
// })
//     .promise()
//     .then(response => {
//         console.log(`done! - `, response)
//         console.log(
//             `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName })}`
//         )
//     })
//     .catch(err => {
//         console.log('failed:', err)
//     })
export function createBucket (req, res, next) {
    console.log("CReating bucket")
    const params = {
        Bucket: 'ThisIsABucketName5e87e0399a90e04c14f327ed',
        // ACL: 'public-read',
        CreateBucketConfiguration: {
            // Set your region here
            LocationConstraint: "us-west-1",

        }
    };
    s3.createBucket(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log('Bucket Created Successfully', data.Location);
    });
    return next()
}


// var upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'images',
//       acl: 'public-read',
//     //   metadata: function (req, file, cb) {
//     //       console.log("metadata", req.body)
//     //     cb(null, {fieldName: "file"});
//     //   },
//       key: function (req, file, cb) {
//         console.log("key", req.body)
//         cb(null, Date.now().toString())
//       }
//     })
//   })


export var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'ThisIsABucketName5e87e0399a90e04c14f327ed',
        key: function (req, file, cb) {
            console.log(req.body);
            console.log(file);
            cb(null, 'image_' + req.body.name);
        }
    })
});
