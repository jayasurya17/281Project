import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';
import { VictoryPie } from 'victory'


class BugStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectId: "5e8fabd02d11df46cc4c69a5",
            bugStats: {

            }
        };
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/bugs/getBugStatsByProject/${this.state.projectId}`)
            .then(response => {
                this.setState({ bugStats: response.data });
                console.log(this.state.bugStats);
                //should print 
                // {
                //     "total": 6,
                //     "open": 5,
                //     "closed": 1,
                //     "severity": {
                //         "high": 2,
                //         "medium": 3,
                //         "low": 1
                //     }
                // }
                // HANDLE response here
            })
            .catch(err => {
                console.log(err);
                let data = {
                    "total": 0,
                    "open": 0,
                    "closed": 0,
                    "severity": {
                        "high": 0,
                        "medium": 0,
                        "low": 0
                    }
                }
                this.setState({ bugStats: data });
            })
    }

    render() {
        let bugsCount, bugsAnalysis
        if (this.state.bugStats !== null && this.state.bugStats.open >= 0 && this.state.bugStats.closed >= 0) {
            bugsCount =
                <div>
                    <p className='display-4'>Bugs count</p>
                    <svg width={450} height={450}>
                        <VictoryPie
                            standalone={false}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            width={400} height={400}
                            innerRadius={100}
                            colorScale={["#e42024", "#a7d930"]}
                            padAngle={({ datum }) => datum.y}
                            data={[
                                { x: 1, y: this.state.bugStats.open, label: `Open:${this.state.bugStats.open}` },
                                { x: 2, y: this.state.bugStats.closed, label: `Closed:${this.state.bugStats.closed}` },
                            ]}
                        />
                    </svg>


                </div>
        }

        if (this.state.bugStats.severity && this.state.bugStats.severity.high >= 0 && this.state.bugStats.severity.medium >= 0 && this.state.bugStats.severity.low >= 0) {
            bugsAnalysis =
                <div>
                    <p className='display-4'>Bugs Analysis</p>
                    <svg width={450} height={450}>
                        <VictoryPie
                            standalone={false}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                            }}
                            width={400} height={400}
                            innerRadius={100}
                            colorScale={["#e42024", "#ef545f", "#e9b1b1"]}
                            padAngle={({ datum }) => datum.y}
                            data={[
                                { x: 1, y: this.state.bugStats.severity.high, label: `High:${this.state.bugStats.severity.high}` },
                                { x: 2, y: this.state.bugStats.severity.medium, label: `Medium:${this.state.bugStats.severity.medium}` },
                                { x: 3, y: this.state.bugStats.severity.low, label: `Low:${this.state.bugStats.severity.low}` },



                            ]}
                        />
                    </svg>


                </div>
        }

        return (
            <div>
                <div class="bg-white pl-5 pr-5 pb-5">

                    <div style={{ display: "flex", paddingTop: "50px" }}>
                        {bugsCount}
                        {bugsAnalysis}
                    </div>
                </div>
            </div>
        )
    }
}
export default BugStats;
