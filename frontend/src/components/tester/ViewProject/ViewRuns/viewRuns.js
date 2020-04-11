import React, { Component } from 'react';
import Header from '../../../common/header';
import Footer from '../../../common/footer';
import Navigation from '../../../common/navigation';
import ProjectNavbar from '../../../common/projectTesterNavbar';
import axios from 'axios';
import constants from '../../../../utils/constants';
import RunContainer from './runContainer';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            arn : null,
            projectObj: {},
            allRuns: []
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/project/details/${this.props.match.params.projectId}`)
            .then((response) => {
                this.setState({
                    arn : response.data.ARN,
                    projectObj: response.data
                })
                axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listRuns?projectArn=${response.data.ARN}`)
                .then((response) => {
                    this.setState({
                        allRuns: response.data.runs
                    })
                })
            })
    }

    updateRuns = () => {
        axios.get(`${constants.BACKEND_SERVER.URL}/project/details/${this.props.match.params.projectId}`)
            .then((response) => {
                this.setState({
                    arn : response.data.ARN,
                    projectObj: response.data
                })
                axios.get(`${constants.BACKEND_SERVER.URL}/devicefarm/listRuns?projectArn=${response.data.ARN}`)
                .then((response) => {
                    this.setState({
                        allRuns: response.data.runs
                    })
                })
            })
    }

    render() {

        let runs = [],
            index
        for (index in this.state.allRuns) {
            runs.push(<RunContainer runObj={ this.state.allRuns[index] } updateHandler = { this.updateRuns } />)
        }

        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <ProjectNavbar projectObj = { this.state.projectObj } />
                    
                    { runs }

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;