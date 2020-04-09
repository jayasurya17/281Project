import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../utils/constants';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            type: "BUILTIN_FUZZ",
            allDevicePools: [],
            devicePoolARN: null,
            allUploads: [],
            currentUploadARN: null
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listDevicePools?projectId=${this.props.projectId}`)
            .then((response) => {
                this.setState({
                    allDevicePools: response.data.devicePools,
                    devicePoolARN: response.data.devicePools[0].arn
                })
            })
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listUploads?projectArn=${this.props.arn}`)
            .then((response) => {
                if (response.data.uploads.length > 0) {
                    this.setState({
                        allUploads: response.data.uploads,
                        currentUploadARN: response.data.uploads[0].arn
                    })
                }
            })
    }

    typeChangeHandler = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    devicePoolChangeHandler = (e) => {
        this.setState({
            devicePoolARN: e.target.value
        })
    }

    uploadChangeHandler = (e) => {
        this.setState({
            currentUploadARN: e.target.value
        })
    }

    scheduleRun = () => {
        const reqBody = {
            appArn: this.state.currentUploadARN,
            projectArn: this.props.arn,
            type: this.state.type,
            devicePoolArn: this.state.devicePoolARN
        }
        axios.post(`${constants.BACKEND_SERVER.URL}/devicefarm/schedulerun`, reqBody)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const types = ['BUILTIN_FUZZ', 'BUILTIN_EXPLORER', 'WEB_PERFORMANCE_PROFILE', 'APPIUM_JAVA_JUNIT', 'APPIUM_JAVA_TESTNG', 'APPIUM_PYTHON', 'APPIUM_NODE', 'APPIUM_RUBY', 'APPIUM_WEB_JAVA_JUNIT', 'APPIUM_WEB_JAVA_TESTNG', 'APPIUM_WEB_PYTHON', 'APPIUM_WEB_NODE', 'APPIUM_WEB_RUBY', 'CALABASH', 'INSTRUMENTATION', 'UIAUTOMATION', 'UIAUTOMATOR', 'XCTEST', 'XCTEST_UI', 'REMOTE_ACCESS_RECORD', 'REMOTE_ACCESS_REPLAY']
        var index,
            allTypes = [],
            devicePools = [],
            devicePoolObj,
            allUploads = [],
            uploadObj
        for (index in types) {
            allTypes.push(<option value={types[index]}>{types[index]}</option>)
        }
        for (index in this.state.allDevicePools) {
            devicePoolObj = this.state.allDevicePools[index]
            devicePools.push(<option value={devicePoolObj.arn}>{devicePoolObj.name}</option>)
        }
        for (index in this.state.allUploads) {
            uploadObj = this.state.allUploads[index]
            if (uploadObj.status === "SUCCEEDED") {
                allUploads.push(<option value={uploadObj.arn}>{uploadObj.name}</option>)
            }
        }
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="typesAvailable">All uploads</label>
                    <select id="typesAvailable" class="form-control" onChange={ this.uploadChangeHandler }>
                        { allUploads }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="typesAvailable">Device pools</label>
                    <select id="typesAvailable" class="form-control" onChange={ this.devicePoolChangeHandler }>
                        { devicePools }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="typesAvailable">Types</label>
                    <select id="typesAvailable" class="form-control" onChange={ this.typeChangeHandler }>
                        { allTypes }
                    </select>
                </div>

                <button className="btn btn-primary w-100" onClick={ this.scheduleRun }>Schedule run</button>

            </div>
        )
    }
}
//export Landing Component
export default Landing;