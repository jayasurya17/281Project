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
    type: String
});

export default devicePools;
