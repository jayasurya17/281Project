import React, { Component } from 'react';
import Header from './header';
import Navbar from './navigation';
import Footer from '../common/footer';
import axios from 'axios';
import constants from '../../utils/constants';

class TesterRow extends Component {
    render() {
        return (
            <div className="m-3 p-3 shadow">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Name: <span className="font-weight-lighter">{ this.props.testerObj.name }</span></h3>
                        <h3>Email: <span className="font-weight-lighter">{ this.props.testerObj.email }</span></h3>
                        <h3 className="text-info">Bugs reported: <span className="font-weight-lighter">{ this.props.testerObj.bugsReported }</span></h3>
                    </div>
                    <div className="col-md-6">
                        <h3 className="font-weight-light text-success">Accepted projects: <span className="font-weight-bold">{ this.props.testerObj.acceptedProjects.length }</span></h3>
                        <h3 className="font-weight-light text-warning">Requested projects: <span className="font-weight-bold">{ this.props.testerObj.requestedProjects.length }</span></h3>
                        <h3 className="font-weight-light text-danger">Rejected projects: <span className="font-weight-bold">{ this.props.testerObj.rejectedProjects.length }</span></h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 offset-md-8">
                        <button className="btn btn-danger">Block this tester</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Home extends Component {

    constructor() {
        super();
        this.state = {
            allTesters: []
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/admin/testers`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    allTesters: response.data
                })
            })
    }

    render() {

        let index,
            allTesters = []
        for (index in this.state.allTesters) {
            allTesters.push(<TesterRow testerObj={this.state.allTesters[index]} />)
        }

        return (
            <div class="bg-white p-5">
                <Header />
                <Navbar />
                
                { allTesters }

                <Footer />
            </div>
        )
    }
}
//export Home Component
export default Home;