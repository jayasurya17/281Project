'use strict'

import AWS from 'aws-sdk';

import config from '../../../../config/index';

AWS.config.update({
    secretAccessKey: config.awsDeviceFarmKeys.AWS_SECRET_ACCESS,
    accessKeyId: config.awsDeviceFarmKeys.AWS_ACCESSKEY,
	region: config.awsDeviceFarmKeys.REGION,
});

var devicefarm = new AWS.DeviceFarm({apiVersion: '2015-06-23'});

// exports.createProject = async (params) => {
//     var returnObj = await devicefarm.createProject(params, function (err, data) {
//         if (err) console.log(err, err.stack); // an error occurred
//         else  return data;           // successful response
//     });
//     console.log("HERE");
//     return returnObj;
// }

// exports.listDevices = (params) => {
//     console.log(params)
//     devicefarm.listDevices(params, function (err, data) {
//         if (err) console.log(err, err.stack); // an error occurred
//         else     return data           // successful response
//     });
// }

export default devicefarm;