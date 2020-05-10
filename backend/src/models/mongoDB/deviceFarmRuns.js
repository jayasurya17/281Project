`use strict`

import mongoose from 'mongoose'

const counterSchema = new mongoose.Schema({
    total: Number,
    passed: Number,
    failed: Number,
    warned: Number,
    errored: Number,
    stopped: Number,
    skipped: Number
});

const deviceMinutesSchema = new mongoose.Schema({
    total: { type: Number, default: 0.0 },
    metered: { type: Number, default: 0.0 },
    unmetered: { type: Number, default: 0.0 }
})

const artifactSchema = new mongoose.Schema({
    arn: String,
    name: String,
    type: String,
    extension: String,
    url: String
});

const testSchema = new mongoose.Schema({
    arn: String,
    name: String,
    created: { type: Date, default: Date.now },
    status: String,
    result: String,
    counters: counterSchema,
    message: String,
    deviceMinutes: deviceMinutesSchema,
    artifacts: [artifactSchema]
});

const suiteSchema = new mongoose.Schema({
    arn: String,
    name: String,
    created: { type: Date, default: Date.now },
    status: String,
    result: String,
    counters: counterSchema,
    message: String,
    deviceMinutes: deviceMinutesSchema,
    tests: [testSchema]
});

const jobSchema = new mongoose.Schema({
    arn: String,
    name: String,
    created: { type: Date, default: Date.now },
    status: String,
    result: String,
    counters: counterSchema,
    message: String,
    deviceName: String,
    deviceOS: String,
    deviceMinutes: deviceMinutesSchema,
    suites: [suiteSchema],
});

const runSchema = new mongoose.Schema({
    arn: String,
    name: String,
    type: String,
    platform: String,
    status: String,
    result: String,
    counters: counterSchema,
    totalJobs: Number,
    deviceMinutes: deviceMinutesSchema,
    jobs: [jobSchema],
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    }
});

export default runSchema;