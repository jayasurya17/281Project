
import React, {Component} from 'react';
import { Button, FormGroup, Label, Input} from 'reactstrap';
import '../AddProject/AddProject.css'
import axios from 'axios';
import Constants from '../../../utils/constants';
import './fileBrowser.styles.css'

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
             //name: 'testbucket-00710'
             name : this.props.projectId
        }
        axios.post(`${Constants.BACKEND_SERVER.URL}/manager/viewProject`, reqObj)
            .then((response) => {
                console.log('viewproject response', response.data);
                this.setState({allProjCards:response.data})
			})
            .catch((error) => { 
                console.log(error)
                this.setState({
                    errMsg: "Error occured",
                    successMsg: ""
                })
            })
    }

        
      
    render(){

        return(
            <div className="row browserGrid">
                
                <div className="viewfiles">
                <h3>Files in this project</h3>
                
                { this.state.allProjCards.map((element)=>{
                    return(
                        <div className="row">
                            <div className="col-md-8">{element.name}</div>
                            <div className="col-md-4">
                                <a href={element.url} target="_blank"><button className="btn btn-danger">Download this file</button></a>
                            </div>
                        </div>                        
                    )
                }) }
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;