import React, {Component} from 'react';
import { Redirect } from 'react-router';

class Home extends Component {

    render(){	 
        
        let Navbar = [];
        if(!localStorage.getItem('281UserType')) {
            Navbar = <Redirect to="/login" />
        } else if (localStorage.getItem('281UserType') === "Manager") {
            Navbar = [
                <div class="row bg-dark text-center font-weight-bold">
                    <div class="col-md-2 p-2"><a href="/manager/home" class="text-white">Home</a></div>
                    <div class="col-md-2 p-2"><a href="/manager/project/all" class="text-white">My projects</a></div>
                    <div class="col-md-2 p-2"><a href="/manager/project/new" class="text-white">Post new project</a></div>
                </div>
            ]
        } else {
            Navbar = [
                <div class="row bg-dark text-center font-weight-bold">
                    <div class="col-md-2 p-2"><a href="/tester/home" class="text-white">Home</a></div>
                    <div class="col-md-2 p-2"><a href="/tester/project/all" class="text-white">All projects</a></div>
                    <div class="col-md-2 p-2"><a href="/tester/project/active" class="text-white">My projects</a></div>
                    <div class="col-md-2 p-2"><a href="/tester/announcements" class="text-white">Announcements</a></div>
                </div>
            ]
        }

        return(
            <div>
                { Navbar }
            </div>
        )
    }
}
//export Home Component
export default Home;