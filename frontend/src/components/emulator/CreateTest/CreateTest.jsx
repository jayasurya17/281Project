import React, { Component } from "react";
import Header from "../../common/header";
import Footer from "../../common/footer";
import Navigation from "../../common/navigation";
import axios from "axios";
import Constants from "../../../utils/constants";

import "./CreateTest.styles.css";

class CreateTest extends Component {
  state = {
    platformName: "",
    platformVersion: "",
    deviceName: "",
    app: "",
    appPackage: "",
    appActivity: "",
    automationName: "",
    selectedFile: null
  };

  handleChange = e => {
    //console.log(this.state.capabilities);
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  onFileChange = event => {
    //  event.preventDefault();

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    if (this.state.selectedFile) {
      this.setState({ app: this.state.selectedFile.name });
    }
  };

  onFileUpload = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", this.state.selectedFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data"
      }
    };
    axios
      .post(
        `${Constants.BACKEND_SERVER.URL}/users/emulators/fileUpload`,
        formData
      )
      .then(response => {
        if (response.status == 201) {
          window.alert("File Uploaded Successfully");
        } else {
          console.log(response);
        }
      });
  };
  onSubmit = e => {
    e.preventDefault();
    const capabilities = {
      platformName: this.state.platformName,
      platformVersion: this.state.platformVersion,
      deviceName: this.state.deviceName,
      app: this.state.selectedFile.name,
      appPackage: this.state.appPackage,
      appActivity: this.state.appActivity,
      automationName: this.state.automationName
    };
    console.log(capabilities);
    axios
      .post(
        `${Constants.BACKEND_SERVER.URL}/users/emulators/createtest`,
        capabilities
      )
      .then(response => {
        console.log(response);
      });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <p>File Details:</p>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <p>Choose before Pressing the Upload button</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {/* <!-- Card with information --> */}
        <div class="bg-white pl-5 pr-5 pb-5">
          <Header />
          <Navigation />
          <div>
            <form className="emulatorForm">
              Platform Name:{" "}
              <input
                type="text"
                name="platformName"
                value={this.state.platformName}
                onChange={this.handleChange}
              ></input>
              Platform Version:{" "}
              <input
                type="text"
                name="platformVersion"
                value={this.state.platformVersion}
                onChange={this.handleChange}
              ></input>
              Device Name:{" "}
              <input
                type="text"
                name="deviceName"
                value={this.state.deviceName}
                onChange={this.handleChange}
              ></input>
              {
                //upload test apk file here
              }
              App:
              <input type="file" onChange={this.onFileChange} />
              {this.fileData()}
              <button onClick={this.onFileUpload}>Upload!</button>
              App Package:{" "}
              <input
                type="text"
                name="appPackage"
                value={this.state.appPackage}
                onChange={this.handleChange}
              ></input>
              App Activity:{" "}
              <input
                type="text"
                name="appActivity"
                value={this.state.appActivity}
                onChange={this.handleChange}
              ></input>
              Automation Name:{" "}
              <input
                type="text"
                name="automationName"
                value={this.state.automationName}
                onChange={this.handleChange}
              ></input>
              <button onClick={this.onSubmit}>Create Test</button>
            </form>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}
export default CreateTest;
