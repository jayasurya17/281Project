import React, {Component} from 'react';
import { Col, FormGroup, Input, FormText } from 'reactstrap';
class Landing extends Component {

    constructor() {
        super();
        this.state = {
            selectedFile: ""
        }
    }

    onChangeFileUpload = (e) => {
        this.setState({
            selectedFile: e.target.value
        });
    }

    uploadNewFile = () => {

    }

    render(){

        return(
            <div className="col-md-6">
                <h1 className="display-4">Infomation</h1>
                <FormGroup row>
                    <Col sm={8}>
                        <Input type="file" name="image" id="image" multiple="" onChange={this.onChangeFileUpload}  value={ this.state.selectedFile } />
                        <FormText color="muted">
                            Upload File for your Project
                        </FormText>
                    </Col>
                    <Col sm={4}>
                        <button className="btn btn-warning w-100" onClick={ this.uploadNewFile }>Upload file</button>
                    </Col>
                </FormGroup>
                <div className="row mt-2 mb-2">
                    <button className="btn btn-danger w-100">Report Bugs</button>
                </div>
                <div className="row mt-2 mb-2">
                    <a href={ `/tester/project/run/${this.props.projectId}` } className="w-100">
                        <button className="btn btn-success w-100">Run test on real devices</button>
                    </a>
                </div>
                <div className="row mt-2 mb-2">
                    <button className="btn btn-info w-100">Run test on emulators</button>
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;