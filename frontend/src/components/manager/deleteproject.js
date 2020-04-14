import React, {Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../manager/AddProject/AddProject.css';
import axios from 'axios';
import Constants from '../../utils/constants';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';

class ProjectForm extends Component {

    constructor() {
        super();
        this.state = {
            projectname: "",
            filename: ""
        }
    }

    projectnameChangeHandler = (e) => {
        this.setState({
            projectname: e.target.value
            
        });
        
    }

    filenameChangeHandler = (e) => {
        this.setState({
            filename: e.target.value
        });
    }
    deleteProjHandler = () => {
        console.log(this.state)
        if (this.state.projectname === "") {
            this.setState({
                errMsg: "Required fields are empty",
                successMsg: ""
            })
        } else {

            let fd = new FormData();
            fd.append('managerId', localStorage.getItem('281UserId'))
            fd.append('projectname', this.state.projectname)
            //fd.append('filename', this.state.filename)
            
           
            axios.post(`${Constants.BACKEND_SERVER.URL}/manager/deleteProject`, fd)
                .then(() => {
                    this.setState({
                        projectname: "",
                        filename: "",
                        errMsg: "",
                        successMsg1: "Project Deleted!",
                        //successMsg2: "File Deleted"
                    })
                })
            
            .catch((error) => { 
                console.log(error)
                this.setState({
                    errMsg: "Error occured",
                    successMsg: ""
                })
            })
    }

}
deleteFileHandler = () => {
    console.log(this.state)
    if (this.state.filename === "") {
        this.setState({
            errMsg: "Required fields are empty",
            successMsg: ""
        })
    } else {
        let reqBody = {
            managerId: localStorage.getItem('281UserId'),
            filename: this.state.filename
        }       
        axios.post(`${Constants.BACKEND_SERVER.URL}/manager/deleteFile`, reqBody)
            .then(() => {
                this.setState({
                    projectname: "",
                    filename: "",
                    errMsg: "",
                    //successMsg1: "Project Deleted!",
                    successMsg2: "File Deleted"
                })
            })
        
        .catch((error) => { 
            console.log(error)
            this.setState({
                errMsg: "Error occured",
                successMsg: ""
            })
        })
}

}
    render () {

        return (
            <Form>
                <h3> Delete</h3>
                <br>
                </br>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="projectname">Enter Project Name</Label>
                            <Input type="text" name="projectname" onChange={this.projectnameChangeHandler} id="projectname" placeholder="Enter Project Name" value={ this.state.projectname }/>
                        </FormGroup>
                    </Col>
                    <Button color="danger" onClick={this.deleteProjHandler} className="w-100"> Delete project </Button>
                    <br></br><br></br>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="filename">Enter File Name</Label>
                            <Input type="text" name="filename" onChange={this.filenameChangeHandler} id="filename" placeholder="Enter File Name" value={ this.state.filename }/>
                        </FormGroup>
                    </Col>
                    <Button color="danger" onClick={this.deleteFileHandler} className="w-100"> Delete File  </Button>

                
                
            </Form>

        );
    }
}


class DeleteProject extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = () => {

    }

    render() {
        return (
            <div className="mainDiv">
                <div className="navDiv">
                </div>
                <div className="listDiv">
                    <div>
                        <div>
                        <Header />
                    <Navigation />
                    
                            <ProjectForm />
                        </div>
                        <Footer />

                    </div>
                </div>
            </div>
        );
    }
}




export default DeleteProject;