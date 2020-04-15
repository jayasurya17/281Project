import React, { Component } from 'react';

class Home extends Component {

    render() {

        return (
            <div class="row text-center bg-dark mt-1">
                <div class="col-md-4 p-2 bg-white"><a href={`/manager/project/view/${this.props.projectObj._id}`} class="text-dark">{this.props.projectObj.name}</a></div>
                <div class="col-md-2 p-2"><a href={`/manager/project/runs/${this.props.projectObj._id}`} class="text-white">View runs</a></div>
                <div class="col-md-2 p-2"></div>
                <div class="col-md-2 p-2"></div>
            </div>
        )
    }
}
//export Home Component
export default Home;