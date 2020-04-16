import React, {Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import DisplayBugs from './displayBugs';
import axios from 'axios';
import Constants from '../../utils/constants';

class BugsInProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
          bugs : null
        };
      }

      componentDidMount() {
        axios.get(`${Constants.BACKEND_SERVER.URL}/bugs/allByProjectId/${this.props.match.params.projectId}`)
        .then((response) => {
            if (response.data != null) {
                this.setState({bugs : response.data});
            }
        })
    }

    render(){


        return(
            <div>
                
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5" style={{position:"relative"}}>
                    <Header />
                    <Navigation />
                    <div style={{display : "flex",flexDirection :"column",paddingTop:"50px"}}>
                        <DisplayBugs bugs = {this.state.bugs} />
                        <Footer  />

                    </div>

                </div>
            </div>
        )
    }
}

export default BugsInProject;

