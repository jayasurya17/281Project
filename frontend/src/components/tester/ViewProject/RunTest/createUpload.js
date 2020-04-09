import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../utils/constants';
import { FormGroup, Input, FormText, Label } from 'reactstrap';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            file: "",
            type: "ANDROID_APP"
        }
    }

    typeChangeHandler = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeFileUpload = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    createUpload = () => {
        
        let fd = new FormData();
        fd.append('projectArn', this.props.arn)
        fd.append('type', this.state.type)
        fd.append('file', this.state.file)
        axios.post(`${constants.BACKEND_SERVER.URL}/devicefarm/createupload`, fd)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const types = ['ANDROID_APP', 'IOS_APP', 'WEB_APP', 'EXTERNAL_DATA', 'APPIUM_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_PYTHON_TEST_PACKAGE', 'APPIUM_NODE_TEST_PACKAGE', 'APPIUM_RUBY_TEST_PACKAGE', 'APPIUM_WEB_JAVA_JUNIT_TEST_PACKAGE', 'APPIUM_WEB_JAVA_TESTNG_TEST_PACKAGE', 'APPIUM_WEB_PYTHON_TEST_PACKAGE', 'APPIUM_WEB_NODE_TEST_PACKAGE', 'APPIUM_WEB_RUBY_TEST_PACKAGE', 'CALABASH_TEST_PACKAGE', 'INSTRUMENTATION_TEST_PACKAGE', 'UIAUTOMATION_TEST_PACKAGE', 'UIAUTOMATOR_TEST_PACKAGE', 'XCTEST_TEST_PACKAGE', 'XCTEST_UI_TEST_PACKAGE', 'APPIUM_JAVA_JUNIT_TEST_SPEC', 'APPIUM_JAVA_TESTNG_TEST_SPEC', 'APPIUM_PYTHON_TEST_SPEC', 'APPIUM_NODE_TEST_SPEC', 'APPIUM_RUBY_TEST_SPEC', 'APPIUM_WEB_JAVA_JUNIT_TEST_SPEC', 'APPIUM_WEB_JAVA_TESTNG_TEST_SPEC', 'APPIUM_WEB_PYTHON_TEST_SPEC', 'APPIUM_WEB_NODE_TEST_SPEC', 'APPIUM_WEB_RUBY_TEST_SPEC', 'INSTRUMENTATION_TEST_SPEC', 'XCTEST_UI_TEST_SPEC']
        var index,
            allTypes = []
        for (index in types) {
            allTypes.push(<option value={types[index]}>{types[index]}</option>)
        }
        return (
            <div>
                <FormGroup>
                        <Label for="image" sm={2}>File</Label>
                        <Input type="file" name="image" id="image" multiple="" onChange={this.onChangeFileUpload} />
                        <FormText color="muted">
                            Upload File for your Project
                    </FormText>
                </FormGroup>
                <div className="form-group">
                    <label htmlFor="typesAvailable">Types</label>
                    <select id="typesAvailable" class="form-control" onChange={this.typeChangeHandler}>
                        {allTypes}
                    </select>
                </div>

                <button className="btn btn-primary w-100" onClick={this.createUpload}>Create upload</button>

            </div>
        )
    }
}
//export Landing Component
export default Landing;