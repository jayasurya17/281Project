import React, { Component } from 'react';
import Header from './header';
import Navbar from './navigation';
import Footer from '../common/footer';
import DashboardCard from '../common/Dashboard/card';
import axios from 'axios';
import Constants from '../../utils/constants';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            numberOfTesters: null,
            numberOfManagers: null,
            numberOfProjects: null,
            fileCount: null,
            numberOfRuns: null,
            numberOfDevices: null,
            devicefarmRuntime: null,
            numberOfEmulatorRuns: null,
            projectObj: null,
            preBookedTime: null,
            emulatorRunTime: null
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/admin/getUsage`)
            .then((response) => {
                this.setState({
                    numberOfTesters: response.data.numberOfTesters,
                    numberOfManagers: response.data.numberOfManagers,
                    numberOfProjects: response.data.numberOfProjects,
                    fileCount: response.data.fileCount,
                    numberOfRuns: response.data.numberOfRuns,
                    numberOfDevices: response.data.numberOfDevices,
                    devicefarmRuntime: response.data.devicefarmRuntime,
                    numberOfEmulatorRuns: response.data.numberOfEmulatorRuns,
                    projectObj: response.data.projectObj,
                    preBookedTime: response.data.preBookedTime,
                    emulatorRunTime: response.data.emulatorRunTime
                })
            })
    }



    render() {

        if (this.state.fileCount === null) {
            return (
                <div class="bg-white pl-5 pr-5">
                    <Header />
                    <Navbar />
                    <p className="display-4 p-5 m-5 text-center">Fetching...</p>
                    <Footer />
                </div>
            )
        }

        return (
            <div class="bg-white pl-5 pr-5">
                <Header />
                <Navbar />

                <div className="row mt-5">
                    <div className="col-md-3">
                        <DashboardCard heading="Number of managers" count={this.state.numberOfManagers} background="bg-primary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Number of testers" count={this.state.numberOfTesters} background="bg-secondary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Number of projects" count={this.state.numberOfProjects} background="bg-warning" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Total number of files" count={this.state.fileCount} background="bg-info" />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-4">
                        <DashboardCard heading="Total number of runs" count={this.state.numberOfRuns} background="bg-primary" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Number of devices being used" count={this.state.numberOfDevices} background="bg-secondary" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Device farm total runtime" count={this.state.devicefarmRuntime} background="bg-warning" />
                    </div>
                </div>

                <div className="row mt-5 mb-5">
                    <div className="col-md-4">
                        <DashboardCard heading="Number of emulator runs" count={this.state.numberOfEmulatorRuns} background="bg-primary" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Emulators run time" count={this.state.emulatorRunTime} background="bg-secondary" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Pre booked time" count={this.state.preBookedTime} background="bg-warning" />
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}
//export Home Component
export default Home;