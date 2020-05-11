`use strict`

import mongoose from 'mongoose'

const preBookedPools = new mongoose.Schema({
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
    },
    isDeleted: {
        type: Boolean,
        default: false        
    },
    runArn: String,
    projectId: mongoose.Types.ObjectId,
    uploadComplete: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('preBookedPools', preBookedPools)
