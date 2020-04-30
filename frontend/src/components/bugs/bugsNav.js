import React, {Component} from 'react';
import { Button, Input} from 'reactstrap';
import { withRouter} from 'react-router-dom';


class BugsNav extends Component {

  constructor(props){
    super(props);
    this.state={
      projectId : null,
      errMsg: '',
      successMsg: '',
    }
  }

  changeHandler = (event)  => {
    let value = event.target.value;
    this.setState({ projectId: value });
  }

    goToCreateBug = (e) =>{
        e.preventDefault();
        this.props.history.push(`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/createBug`);
    }

    goToBugsByProject = (e) =>{
      e.preventDefault();
      if(this.state.projectId==null ){
      this.setState({
        successMsg: '',
        errMsg: 'Please enter correct project id ',
    });
    }else{
      this.props.history.push(`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/project/`+this.state.projectId);
  }
}

    render(){
        return(
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly",paddingTop:"30px"}}>
                <Button style={{height:"50px"}}outline onClick={this.goToCreateBug} color="primary">Create New Bug</Button>{' '}
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                <Input type="text" name="projectId" id="projectId" onChange={this.changeHandler} placeholder="Enter project id here" />
                <div style={{paddingLeft:"20px"}}></div>
                <Button style={{height:"50px",width:"300px"}} onClick={this.goToBugsByProject} outline color="primary">Search By Project Id</Button>{' '}
                </div>
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
        )
    }
}
export default withRouter(BugsNav);

