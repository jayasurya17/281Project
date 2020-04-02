import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Root from './root/root';
import Login from './root/login';
import Logout from './root/logout';
import CreateAccount from './root/createAccount';

import TesterHome from './tester/home';
import TesterCheck from './tester/testerCheck';
import TesterUpdateAccount from './tester/updateAccount';

import ManagerHome from './manager/home';
import ManagerCheck from './manager/managerCheck';
import ManagerUpdateAccount from './manager/updateAccount';

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
                <Route path="/tester/home" component={ TesterHome } />
                <Route path="/tester/update-account" component={ TesterUpdateAccount } />
                

                <Route path="/manager/" component={ ManagerCheck } />
                <Route path="/manager/home" component={ ManagerHome } />
                <Route path="/manager/update-account" component={ ManagerUpdateAccount } />
            </div>
        )
    }
}
//Export The Main Component
export default Main;