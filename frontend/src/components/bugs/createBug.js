import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import {
    Card, CardBody, Dropdown,
    CardTitle, Button, Form, Input, Label, DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
import axios from 'axios';
import Constants from '../../utils/constants';



class CreateBugView extends Component {

    constructor(props){
        super(props);
        this.state = {
                subject :  null,
                projectId : null,
                status : "Open",
                severity : null,
                tester : localStorage.getItem('281Username'),
                name: null,
                dropdownOpen: true,
                errMsg: '',
                successMsg: '',
                dropdownOpenState: false,
                dropdownOpenSeverity: false

        }
    }

    toggleSeverity =() => {
        this.setState({
          dropdownOpenSeverity: !this.state.dropdownOpenSeverity
        });
      }

    changeHandler = (event)  => {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ [key]: value });
      }

    changeSeverityValue = (event) => {
    event.preventDefault();
    var value = event.currentTarget.textContent;
    this.setState((prevState) => ({
        ...prevState,
        bug: {
            ...prevState.bug,
            severity: value,
        },
        dropdownOpenSeverity: !prevState.dropdownOpenSeverity,
    }))
    }

    createBug = (e) => {
        e.preventDefault();
        
        const bug = {
            name: this.state.name,
            subject: this.state.subject,
            projectId: this.state.projectId,
            severity: this.state.severity,
            status: this.state.status,
            tester : this.state.tester
        }
        axios.post(Constants.BACKEND_SERVER.URL + "/bugs/createBug", bug)
            .then((response) => {
                this.setState({
                    subject: null,
                    severity: null,
                    projectId: null,
                    name: null
                });
                if (response.status === 201) {
                    this.setState({
                        successMsg: 'Bug created successfully',
                        errMsg: '',
                    });
                } else if (response.status === 409) {
                    this.setState({
                        successMsg: '',
                        errMsg: 'Bug with name already exists',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    errMsg: 'Failed to create bug',
                    successMsg: '',
                });
            });

    }

    toggleState =() => {
        this.setState({
          dropdownOpenState: !this.state.dropdownOpenState
        });
      }

    changeStateValue = (e) => {
        var value = e.currentTarget.textContent;
        this.setState((prevState) => ({
            ...prevState,
            bug: {
                ...prevState.bug,
                status: value,
            },
            dropdownOpenState: !prevState.dropdownOpenState,
        }))
      }
    
    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    render() { 

        return (
            <div>

                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <div style = {{ display : "flex",flexDirection :"row", justifyContent:"center"}}>
                        <Card style = {{  alignItems : "center" ,  width : "600px"}}>
                        <CardBody style={{background:"aliceblue" ,  width : "inherit", alignContent : "center" }}>
                            <CardTitle style={{paddingLeft : "40px",fontWeight: "bold", fontSize: "x-large", fontFamily: "none"}}>Create a bug</CardTitle>
                            <hr/>
                            <Form>
                            <div style={{alignItems:"center"}}>
                            <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Name:</Label>
                                    <div style={{paddingLeft : "40px"}}>
                                    <Input type="text" name="name" id="name"  onChange={this.changeHandler} required/>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    <Label>Subject:</Label>
                                    <div style={{paddingLeft : "40px"}}>
                                    <Input type="text" name="subject" id="subject"  onChange={this.changeHandler} required/>
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Project Id:
                                    <div style={{paddingLeft : "28px"}}>
                                    <Input type="text" name="projectId" id="projectId" onChange={this.changeHandler} required />
                                    </div>
                                </div>
                                <div style = {{ display : "flex",  flexDirection :"row", padding : "40px"}}>
                                    Severity:
                                    <div style={{paddingLeft : "37px"}}>
                                    <Dropdown isOpen={this.state.dropdownOpenSeverity} onClick={this.toggleSeverity}>
                                        <DropdownToggle caret tag="span"
                                            data-toggle="dropdown"
                                            aria-expanded={this.state.dropdownOpenSeverity}>{this.state.severity==null ? "Select Severity" : this.state.severity}</DropdownToggle>
                                        <DropdownMenu>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>High</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>Medium</div></DropdownItem>
                                        <DropdownItem ><div onClick={this.changeSeverityValue}>Low</div></DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>                                    
                                    </div>
                                </div>
                            </div>
                            </Form>
                            <div style={{paddingLeft : "40px"}}>
                            <Button onClick={this.createBug}>Create Bug</Button>
                            <div className="text-center">
                                    <p className="text-danger">
                                        {' '}
                                        {this.state.errMsg}
                                        {' '}
                                    </p>
                                    <p className="text-success">
                                        {' '}
                                        {this.state.successMsg}
                                        {' '}
                                    </p>
                                </div>
                            </div>
                            </CardBody>
                        </Card>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default CreateBugView;