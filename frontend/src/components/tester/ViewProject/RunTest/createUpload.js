import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../utils/constants';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
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

    createUpload = () => {
        const reqBody = {
            name: this.state.name,
            projectArn: this.props.arn,
            type: this.state.type
        }
        if ("".localeCompare(this.state.name) === 0) {
            return
        }
        axios.post(`${constants.BACKEND_SERVER.URL}/devicefarm/createupload`, reqBody)
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
                <div className="form-group">
                    <label htmlFor="runName">Run name</label>
                    <input id="runName" class="form-control" onChange={this.nameChangeHandler} value={ this.state.name } />
                </div>
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