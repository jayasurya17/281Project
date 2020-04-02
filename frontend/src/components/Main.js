import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Root from './root/root';
import Login from './root/login';
import Logout from './root/logout';
import CreateAccount from './root/createAccount';

import TesterHome from './tester/dashboard';
import TesterCheck from './tester/testerCheck';
import TesterUpdateAccount from './tester/updateAccount';
import TesterViewAllProjects from './tester/viewAllProjects';

import ManagerHome from './manager/dashboard';
import ManagerCheck from './manager/managerCheck';
import ManagerUpdateAccount from './manager/updateAccount';
import ManagerViewMyProjects from './manager/myProjects';
import MangerCreateProject from './manager/createProject';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={ Root }/>
                <Route path="/login" component={ Login }/>
                <Route path="/logout" component={ Logout }/>
                <Route path="/create-account" component={ CreateAccount }/>
                

                <Route path="/tester/" component={ TesterCheck } />
                <Route path="/tester/dashboard" component={ TesterHome } />
                <Route path="/tester/update-account" component={ TesterUpdateAccount } />

                <Route path="/tester/projects/all" component={ TesterViewAllProjects } />
                

                <Route path="/manager/" component={ ManagerCheck } />
                <Route path="/manager/dashboard" component={ ManagerHome } />
                <Route path="/manager/update-account" component={ ManagerUpdateAccount } />

                <Route path="/manager/project/all" component={ ManagerViewMyProjects } />
                <Route path="/manager/projects/create" component={ MangerCreateProject } />
            </div>
        )
    }
}
//Export The Main Component
export default Main;