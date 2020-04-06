import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants'

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            description: "",
            deviceCount: 10,
            successMsg: "",
            errMsg: ""
        }
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    descriptionChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    deviceCountChangeHandler = (e) => {
        this.setState({
            deviceCount: e.target.value
        })
    }


    createDevicePool = () => {
        if ("".localeCompare(this.state.name) === 0 ||
            "".localeCompare(this.state.name) === 0 ||
            isNaN(parseInt(this.state.deviceCount, 10)) ||
            parseInt(this.state.deviceCount, 10) < 1) {
            return
        }
        const reqBody = {
            projectId: this.props.projectId,
            name: this.state.name,
            description: this.state.description,
            maxDevices: parseInt(this.state.deviceCount, 10)
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/devicefarm/createdevicepool`, reqBody)
            .then(() => {
                this.setState({
                    name: "",
                    description: "",
                    deviceCount: 10,
                    successMsg: "Created successfully",
                    errMsg: ""
                })
            })
            .catch(() => {
                this.setState({
                    successMsg: "",
                    errMsg: "Failed"
                })
            })
    }

    render() {

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="poolName">Device Pool Name</label>
                    <input type="text" id="poolName" onChange={this.nameChangeHandler} value={this.state.name} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="poolName">Device Pool Description</label>
                    <input type="text" id="poolName" onChange={this.descriptionChangeHandler} value={this.state.description} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="poolName">Number of devices required</label>
                    <input type="text" id="poolName" onChange={this.deviceCountChangeHandler} value={this.state.deviceCount} className="form-control" />
                </div>
                <p className="text-success text-center">{ this.state.successMsg }</p>
                <p className="text-danger text-center">{ this.state.errMsg }</p>
                <button onClick={ this.createDevicePool } className="btn btn-primary w-100">Create device pool</button>
            </div>
        )
    }
}
//export Landing Component
export default Landing;