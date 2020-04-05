import React, {Component} from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants';
import FileBrowser from './fileBrowser';

class ListOfUsers extends Component {

    constructor () {
        super();
        this.state = {
            isAccepted: null
        }
    }

    acceptUser = () => {
        var reqData = {
            projectId : this.props.projectId,
            userId : this.props.userId
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/project/acceptUser`, reqData)
        .then((response) => {
            this.setState({
                isAccepted: true
            })
        })
    }

    rejectUser = () => {
        var reqData = {
            projectId : this.props.projectId,
            userId : this.props.userId
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/project/rejectUser`, reqData)
        .then((response) => {
            this.setState({
                isAccepted: false
            })
        })
    }

    render() {
        let userStatus = []
        if (this.state.isAccepted === null) {
            userStatus = [                
                <div className="col-md-8 row">
                    <div className="col-md-5"><button className="btn btn-success w-100" onClick = { this.acceptUser }>Accept</button></div>
                    <div className="col-md-5 offset-md-2"><button className="btn btn-danger w-100" onClick = { this.rejectUser }>Reject</button></div>
                </div>
            ]
        } else if (this.state.isAccepted === true) {
            userStatus = [                
                <div className="col-md-8 row">
                    <p className="text-success text-center">User request accepted</p>
                </div>
            ]
        } else if (this.state.isAccepted === false) {
            userStatus = [                
                <div className="col-md-8 row">
                    <p className="text-danger text-center">User request rejected</p>
                </div>
            ]
        } 
        return (
            <div className="row">
                <div className="col-md-4">
                    <h6>{ this.props.name }</h6>
                    <h6><span className="font-weight-light">{ this.props.email }</span></h6>
                </div>
                { userStatus }
            </div>
        )
    }

}


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
            requestedUsers: [],
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

        
        axios.get(`${Constants.BACKEND_SERVER.URL}/project/requested/${this.props.projectId}`)
        .then((response) => {
            console.log(response.data.requestedUsers)
            this.setState({
                requestedUsers: response.data.requestedUsers
            })
        })
    }

    returnDisplay = (name, value) => {
        return <h6>{ name }: <span className="font-weight-light">{ value }</span></h6>
    }

    announcementChangeHandler = (e) => {
        this.setState({
            announcement: e.target.value
        })
    }

    postAnnouncement = (e) => {
        var reqObj = {
            projectId : this.props.projectId,
            announcement : this.state.announcement
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/project/announcement`, reqObj)
        .then(() => {
            this.setState({
                announcement: ""
            })
        })
    }

    render(){

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
        
        let listOfRequests = []
        for (var index in this.state.requestedUsers) {
            let userObj = this.state.requestedUsers[index]
            listOfRequests.push(<ListOfUsers name = { userObj.name } email = { userObj.email } userId = { userObj._id } projectId = { this.props.projectId } />)
        }

        return(
            <div className="p-5 shadow">
                <div className="row">
                    <div className="col-md-6">

                        <h1 className="display-4">{ this.state.name }</h1>
                        <h4 className="font-weight-light">{ this.state.about }</h4>

                        { description }
                        { technologies }
                        { company }
                        { address }
                        { city }
                        { state }
                        { zipcode }
                        { this.returnDisplay('Test Cases', this.state.testCases) }

                    </div>
                    <div className="col-md-6">
                        <h1 className="display-4">Pending requests</h1>
                        { listOfRequests }
                    </div>

                </div>
                <div className="row">
                    <textarea className="w-100 form-control" style={{ resize: 'none' }} onChange = { this.announcementChangeHandler } value = { this.state.announcement }></textarea>
                    <div className="col-md-12 mt-2 row">
                        <div className="col-md-4 offset-md-8">
                            <button className="btn btn-success w-100" onClick = { this.postAnnouncement }>Send announcement to testers</button>
                        </div>
                    </div>
                </div>

                <FileBrowser />
            </div>
        )
    }
}
//export Landing Component
export default Landing;