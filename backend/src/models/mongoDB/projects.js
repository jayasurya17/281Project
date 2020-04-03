`use strict`

import mongoose from 'mongoose'

const Project = new mongoose.Schema({
    managerId: {
        type: mongoose.Types.ObjectId
    },
	name: {
		type: String,
		maxlength: 50,
		required: true,
    },
    ARN: {
        type: String
    },
	shortDescription: {
		type: String,
		required: true
	},
	detailedDescription: {
		type: String
	},
	companyName: {
		type: String,
		default: null
	},
	address: {
		type: String,
	},
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	zip: {
		type: String,
	},
	testCases: {
		type: String,
	},
	technologies: {
		type: String,
    },
    file: {
        file: String,
    }
}, { versionKey: false })

export default mongoose.model('projects', Project)
