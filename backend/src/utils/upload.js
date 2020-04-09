'use strict'

import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import config from '../../config/env/development';

aws.config.update({
    secretAccessKey: config.awsKeysJayasurya.AWS_SECRET_ACCESS,
    accessKeyId: config.awsKeysJayasurya.AWS_ACCESSKEY,
    region: config.awsKeysJayasurya.REGION,
})

const s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'project-files-281',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;