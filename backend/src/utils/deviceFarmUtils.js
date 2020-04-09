'use strict'

import AWS from 'aws-sdk';

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

exports.createUpload = (params) => {
    console.log(params)
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
    console.log(params)
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