import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants';
import FileBrowser from './fileBrowser';
import InfoContainer from './infoContainer';


class Landing extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            about: "",
            description: null,
            technologies: null,
            company: null,
            address: null,
            city: null,
            state: null,
            zipcode: null,
            testCases: null,
            createdTime: null,
            announcement: "",
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/project/details/${this.props.projectId}`)
            .then((response) => {
                var projectObj = response.data

                this.setState({
                    name: projectObj.name,
                    about: projectObj.shortDescription,
                    description: projectObj.detailedDescription,
                    technologies: projectObj.technologies,
                    company: projectObj.companyName,
                    address: projectObj.address,
                    city: projectObj.city,
                    state: projectObj.state,
                    zipcode: projectObj.zip,
                    testCases: projectObj.testCases,
                    createdTime: projectObj.createdTime,
                })
            })


    }

    returnDisplay = (name, value) => {
        return <h6>{name}: <span className="font-weight-light">{value}</span></h6>
    }

    announcementChangeHandler = (e) => {
        this.setState({
            announcement: e.target.value
        })
    }

    postAnnouncement = (e) => {
        var reqObj = {
            projectId: this.props.projectId,
            announcement: this.state.announcement
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/project/announcement`, reqObj)
            .then(() => {
                this.setState({
                    announcement: ""
                })
            })
    }

    render() {

        let description,
            technologies,
            company,
            address,
            city,
            state,
            zipcode
        if (this.state.description) {
            description = this.returnDisplay('Description', this.state.description)
        }
        if (this.state.technologies) {
            technologies = this.returnDisplay('Technologies', this.state.technologies)
        }
        if (this.state.company) {
            company = this.returnDisplay('Company', this.state.company)
        }
        if (this.state.address) {
            address = this.returnDisplay('Address', this.state.address)
        }
        if (this.state.city) {
            city = this.returnDisplay('City', this.state.city)
        }
        if (this.state.state) {
            state = this.returnDisplay('State', this.state.state)
        }
        if (this.state.zipcode) {
            zipcode = this.returnDisplay('Zipcode', this.state.zipcode)
        }

        return (
            <div className="p-5 shadow">
                <div className="row">
                    <div className="col-md-6">

                        <h1 className="display-4">{this.state.name}</h1>
                        <h4 className="font-weight-light">{this.state.about}</h4>

                        {description}
                        {technologies}
                        {company}
                        {address}
                        {city}
                        {state}
                        {zipcode}
                        {this.returnDisplay('Test Cases', this.state.testCases)}

                    </div>
                    <div className="col-md-6">
                        <InfoContainer projectId={this.props.projectId} />
                        <p className="display-4">Manage project</p>
                        <a href={`/manager/project/devices/${this.props.projectId}`}><button className="btn btn-primary w-100">Add device pool for this project</button></a>
                    </div>

                </div>
                <div className="row">
                    <textarea className="w-100 form-control" style={{ resize: 'none' }} onChange={this.announcementChangeHandler} value={this.state.announcement}></textarea>
                    <div className="col-md-12 mt-2 row">
                        <div className="col-md-4 offset-md-8">
                            <button className="btn btn-success w-100" onClick={this.postAnnouncement}>Send announcement to testers</button>
                        </div>
                    </div>
                </div>

                <FileBrowser projectId = { this.props.projectId } />
            </div>
        )
    }
}
//export Landing Component
export default Landing;