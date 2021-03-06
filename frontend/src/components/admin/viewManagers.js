import React, { Component } from 'react';
import Header from './header';
import Navbar from './navigation';
import Footer from '../common/footer';
import axios from 'axios';
import constants from '../../utils/constants';

class ManagerRow extends Component {

    constructor() {
        super()
        this.state = {
            isActive: true
        }
    }

    blockManager = () => {
        this.setState({
            isActive: false
        })
    }

    render() {
        let blockManager = [
            <div className="col-md-2 offset-md-8">
                <button className="btn btn-danger" onClick={this.blockManager}>Block this manager</button>
            </div>
        ]
        if (this.state.isActive === false) {
            blockManager = [
                <div className="col-md-4 offset-md-8">
                    <h3 className="font-weight-light text-danger">Manager has been blocked</h3>
                </div>
            ]
        }
        return (
            <div className="m-3 p-3 shadow">
                <div className="row">
                    <div className="col-md-8">
                        <h3>Name: <span className="font-weight-lighter">{this.props.managerObj.name}</span></h3>
                        <h3>Email: <span className="font-weight-lighter">{this.props.managerObj.email}</span></h3>
                        <h3>Company name: <span className="font-weight-lighter">{this.props.managerObj.company}</span></h3>
                        <h3 className="text-info">Number of projects: <span className="font-weight-lighter">{this.props.managerObj.projectCount}</span></h3>
                        <h3 className="text-primary">Number of files: <span className="font-weight-lighter">{this.props.managerObj.fileCount}</span></h3>
                    </div>
                </div>
                <div className="row">
                    {blockManager}
                </div>
            </div>
        )
    }
}

class Home extends Component {

    constructor() {
        super();
        this.state = {
            allManagers: []
        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}/admin/managers`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    allManagers: response.data
                })
            })
    }

    render() {

        let index,
            allManagers = []
        for (index in this.state.allManagers) {
            allManagers.push(<ManagerRow managerObj={this.state.allManagers[index]} />)
        }

        return (
            <div class="bg-white pl-5 pr-5">
                <Header />
                <Navbar />

                {allManagers}

                <Footer />
            </div>
        )
    }
}
//export Home Component
export default Home;