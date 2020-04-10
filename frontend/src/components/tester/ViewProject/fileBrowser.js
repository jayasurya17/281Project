import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants';

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            allProjCards: []
        }
    }

    componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/project/filesInProject/${this.props.projectId}/${localStorage.getItem('281UserId')}`)
            .then((response) => {
                console.log(response.data);
                this.setState({ allProjCards: response.data })
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    errMsg: "Error occured",
                    successMsg: ""
                })
            })
    }



    render() {

        let allProjCards = [],
            files
        for (var userId in this.state.allProjCards) {
            files = []
            for (var index in this.state.allProjCards[userId].files) {
                var filename = this.state.allProjCards[userId].files[index].name.split("/")
                files.push(
                    <div className="row mt-2">
                        <div className="col-md-8">{filename[filename.length - 1]}</div>
                        <div className="col-md-4">
                            <a href={this.state.allProjCards[userId].files[index].url} target="_blank"><button className="btn btn-danger">Download this file</button></a>
                        </div>
                    </div>
                )
            }
            allProjCards.push(
                <div className="p-5 border-bottom">
                    <h4>{this.state.allProjCards[userId].name}<span className="font-weight-light">(User ID: {userId})</span></h4>
                    {files}
                </div>
            )
        }

        return (
            <div className="mt-4">
                <h3>Files in this project</h3>
                {allProjCards}
            </div>
        )
    }
}
//export Landing Component
export default Landing;