import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants'

class Landing extends Component {

    constructor() {
        super()
        this.state = {
            allDevicePools: [],
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/devicefarm/listDevicePools?projectId=${this.props.projectId}`)
            .then((response) => {
                console.log(response.data.devicePools);
                this.setState({
                    allDevicePools: response.data.devicePools
                })
            })
    }

    render() {

        let allDevicesPools = [],
            index,
            devicePoolObj
        if (this.state.allDevicePools.length > 0) {
            allDevicesPools.push(
                <div className="row">
                    <div className="col-md-5 font-weight-bold">Name</div>
                    <div className="col-md-4 font-weight-bold">Type</div>
                    <div className="col-md-3 font-weight-bold">Max Devices</div>
                </div>
            );
            for (index in this.state.allDevicePools) {
                devicePoolObj = this.state.allDevicePools[index]
                allDevicesPools.push(
                    <div className="row">
                        <div className="col-md-5">{ devicePoolObj.name }</div>
                        <div className="col-md-4">{ devicePoolObj.type }</div>
                        <div className="col-md-3">{ devicePoolObj.maxDevices }</div>
                    </div>
                );
            }
        } else {
            allDevicesPools.push(<h5 className="text-info font-weight-light">There are no device pools available in this project at the moment</h5>)
        }

        return (
            <div>
                <p className="display-4">List of created device pools</p>
                { allDevicesPools }
            </div>
        )
    }
}
//export Landing Component
export default Landing;