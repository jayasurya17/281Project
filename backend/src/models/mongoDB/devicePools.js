`use strict`

import mongoose from 'mongoose'

const devicePools = new mongoose.Schema({
    arn: String,
    description: String,
    maxDevices: Number,
    name: String,
    rules: [
        {
            attribute: String,
            operator: String,
            value: String
        }
    ],
    type: String,
    createTime: {
        type: Date,
        default: Date.now
    },
    deleteTime: {
        type: Date
    }
});

export default devicePools;
