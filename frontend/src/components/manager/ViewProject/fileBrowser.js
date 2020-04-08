
import React, {Component} from 'react';
import { Col, Row, Button, FormGroup, Label, Input, Container } from 'reactstrap';
import { Card, CardBody } from 'react-simple-card';
import '../AddProject/AddProject.css'
import axios from 'axios';
import Constants from '../../../utils/constants';

import './fileBrowser.styles.css'


//import Typography from '@material-ui/core/Typography';



class Landing extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            allProjCards : []
        }
    }
    
    componentDidMount() {
        let reqObj = {
             name: 'testbucket-00710'
             //name : this.props.projectId
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/manager/viewProject`, reqObj)
            .then((response) => {
                console.log('viewproject response', response.data);
                this.setState({allProjCards:response.data.Contents})
                
                
	// 			if (response.data != null) {

	// 				var projectCards = [],
    //                     item
    //                     projectCards.push(<h2>These are the Files in the Project </h2>  )
	// 				for (var index in response.data.Contents) {
	// 					item = response.data.Contents[index]
    //                     console.log(item.Key, index)
                        
	// 					projectCards.push(
    //                         <ul>
    //                          <Card>
    //     <CardHeader><h5>{item.Key}</h5></CardHeader>
    //     <CardBody> </CardBody>
    //     <CardFooter> </CardFooter>
    // </Card>
                            
    //                         </ul>
	// 					)
    //                 }

	// 				this.setState({
	// 					allProjCards: projectCards
	// 				})
	// 			}
			})
            .catch((error) => { 
                console.log(error)
                this.setState({
                    errMsg: "Error occured",
                    successMsg: ""
                })
            })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    filenameChangeHandler = (e) => {
        this.setState({
            filename: e.target.value
        });
    }


    getFileHandler = () => {
        if (this.state.name === "" && this.state.filename==="") {
            this.setState({
                errMsg: "Required fields are empty",
                successMsg: ""
            })
        } else {
            let fd = new FormData();
            fd.append('name', this.state.name)
            fd.append('filename', this.state.filename)
            
            axios.post(`${Constants.BACKEND_SERVER.URL}/manager/viewFile`, fd)
            .then((response) => {
                console.log('viewproject response', response.data)
                if(response.data === 'File has been Downloaded')
                {
                    window.alert("File Downloaded");
                }
            });
        }
        }    
        
        
       
    render(){

        return(
            <div className="row browserGrid">
             
                              
                <h1>Enter details to download logs and Screenshots</h1>
                <Container style={{width:'300%',height:'500%',backgroundColor: "DodgerBlue",padding: "10px",
      fontFamily: "Arial"}}>
                
                <Row form>
                    <Col md={30}>
                        <FormGroup>
                            <Label for="projectname" style={{fontSize:'30px'}}>Project Name</Label>
                            <Input type="text" name="projectname" onChange={this.nameChangeHandler} id="projectname" placeholder="Enter Project Name" value={ this.state.name }/>
                        </FormGroup>
                    </Col>
                     
                    <Col md={30}>
                        <FormGroup>
                            <Label for="projectname" style={{fontSize:'30px'}}>File Name</Label>
                            <Input type="text" name="projectname" onChange={this.filenameChangeHandler} id="filename" placeholder="Enter File Name" value={ this.state.filename }/>
                        </FormGroup>                        <Button color="danger" onClick={this.getFileHandler} className="w-100"> Download </Button>

                    </Col>
                </Row>
                </Container>
                <h1>Files in this project</h1>
                { this.state.allProjCards.map((element)=>{
                    return(
                        <div>
                            <Card style>
                         <CardBody style={{fontSize:'25px',padding: "10px",fontFamily: "Arial"}}>{element.Key}</CardBody>
                         <br></br>
                         </Card>
                        </div>
                        
                    )
                }) }
            </div>
        )
    }
}
//export Landing Component
export default Landing;