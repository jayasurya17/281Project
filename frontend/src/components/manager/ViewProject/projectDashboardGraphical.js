import React, { Component } from 'react';
import DashboardCard from '../../common/Dashboard/card';
import axios from 'axios';
import constants from '../../../utils/constants';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme } from 'victory'
import './projectDashboard.css'

class Home extends Component {

    constructor() {
        super()
        this.state = {
            totalPassed: "",
            totalFailed: "",
            activeRuns: "",
            completedRuns: "",
            devicesInActiveRuns: "",
            averageDeviceFarmRunsPerTester: "",
            averageEmulatorRunsPerTester: "",
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/dashboardDetails?projectArn=${this.props.ARN}&projectId=${this.props.projectId}`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    totalPassed: response.data.totalPassed,
                    totalFailed: response.data.totalFailed,
                    activeRuns: response.data.activeRuns,
                    completedRuns: response.data.completedRuns,
                    devicesInActiveRuns: response.data.devicesInActiveRuns,
                    averageDeviceFarmRunsPerTester: response.data.averageDeviceFarmRunsPerTester,
                    averageEmulatorRunsPerTester: response.data.averageEmulatorRunsPerTester
                })
            })
    }

    render() {
        console.log(this.state);
        return (
            <div className="dashboardGraphical">
                <div className="pieChart">
                    <p className='display-4'>Run Details</p>
                    <svg width={450} height={450}>
                        <VictoryPie
                            standalone={false}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            width={400} height={400}
                            innerRadius={100}
                            colorScale={["#a7d930", "#e42024", "#507b00", '#282f6c']}
                            padAngle={({ datum }) => datum.y}
                            data={[
                                { x: 1, y: this.state.totalPassed, label: "Passed" },
                                { x: 2, y: this.state.totalFailed, label: "Failed" },
                                { x: 3, y: this.state.activeRuns, label: "Active" },
                                { x: 4, y: this.state.completedRuns, label: "Completed" },


                            ]}
                        />
                    </svg>
                </div>
                <div className="barChart">
                    <p className='display-4'>Average Runs</p>
                    <g width={1000} height={400}>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 15 }}
                            width={400} height={400}
                            alignment="start"
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            sortKey="x"
                        >
                            <VictoryBar horizontal
                                style={{
                                    data: { fill: "#507b00" },
                                    labels: {
                                        fontSize: 15,
                                    }
                                }}

                                data={[
                                    { x: 1, y: this.state.averageDeviceFarmRunsPerTester, label: "Avg Device farm runs" },
                                    { x: 2, y: this.state.averageEmulatorRunsPerTester, label: "Avg Emulator runs" },
                                    { x: 3, y: (this.state.averageEmulatorRunsPerTester + this.state.averageDeviceFarmRunsPerTester), label: "Total runs" }

                                ]}
                            />
                        </VictoryChart>
                    </g>
                </div>

            </div >
        )
    }
}
//export Home Component
export default Home;