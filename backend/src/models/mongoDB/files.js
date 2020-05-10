`use strict`

import mongoose from 'mongoose'

const fileUploads = new mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    fileName: {
        type: String
    },
    uploadTime: {
        type: Date,
        default: Date.now
    },
    deleteTime: {
        type: Date
    }
}, { versionKey: false })

export default mongoose.model('fileUploads', fileUploads)
