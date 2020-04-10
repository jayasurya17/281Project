'use strict'

import AWS from 'aws-sdk';
import Request from 'request';
import config from '../../config/index';

AWS.config.update({
    secretAccessKey: config.awsKeysJayasurya.AWS_SECRET_ACCESS,
    accessKeyId: config.awsKeysJayasurya.AWS_ACCESSKEY,
	region: config.awsKeysJayasurya.REGION,
});

var devicefarm = new AWS.DeviceFarm({apiVersion: '2015-06-23'});

exports.createProject = async (params) => {
    return new Promise((resolve, reject) => {
        devicefarm.createProject(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject(err);
            }
            else {
                resolve(data);   // successful response
            }
        });
    });

}

exports.listDevices = (params) => {
    return new Promise((resolve, reject) => {
        devicefarm.listDevices(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })
}

exports.createDevicePool = (params) => {
    console.log("params", params)
    return new Promise((resolve, reject) => {
        devicefarm.createDevicePool(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })
}

exports.listDevicePools = (params) => {
    return new Promise((resolve, reject) => {
        devicefarm.listDevicePools(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })
}

exports.deleteDevicePool = (params) => {
    console.log(params)
    return new Promise((resolve, reject) => {
        devicefarm.deleteDevicePool(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })    
}

exports.createUpload = (params, file) => {
    return new Promise( async(resolve, reject) => {
        
		let createUploadObj = {
			name: file.originalname,
			projectArn: params.projectArn,
			type: params.type
		}
		let createdUploadObj = await createUploadOnDeviceFarm(createUploadObj)
		console.log("createdUploadObj:", createdUploadObj)

		let options = {
            method: 'PUT',
            url: createdUploadObj.upload.url,
            headers: {},
            body: new Buffer(file.buffer)
		};

		await new Promise(function(resolve,reject){
            Request(options, function (error, response, body) {
                if (error) {
                    console.error("uploading test package zip failed with error: ", error);
                    // res.status(400).json("uploading test package zip failed with error: ", error)
                    reject(error);
                }
                resolve(body);
            });
        });
		
		resolve (createdUploadObj)
    })
}

var createUploadOnDeviceFarm = (params) => {
    return new Promise((resolve, reject) => {
        devicefarm.createUpload(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })    
}

exports.scheduleRun = (params) => {
    return new Promise((resolve, reject) => {
        devicefarm.scheduleRun(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })    
}

exports.getUpload = (params) => {
    return new Promise((resolve, reject) => {
        devicefarm.getUpload(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })    
}

exports.listUploads = (params) => {
    console.log(params)
    return new Promise((resolve, reject) => {
        devicefarm.listUploads(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })    
}

exports.listRuns = (params) => {
    console.log(params)
    return new Promise((resolve, reject) => {
        devicefarm.listRuns(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject ();
            }
            else {
                resolve (data);           // successful response
            }
        });
    })    
}