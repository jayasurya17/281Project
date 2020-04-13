import React, { Component } from "react";
import { Route } from "react-router-dom";
import Root from "./root/root";
import Login from "./root/login";
import Logout from "./root/logout";
import CreateAccount from "./root/createAccount";

import TesterHome from "./tester/dashboard";
import TesterCheck from "./tester/testerCheck";
import TesterUpdateAccount from "./tester/updateAccount";
import TesterViewAllProjects from "./tester/viewAllProjects";
import TesterViewAcceptedProjects from "./tester/viewMyProjects";
import TesterViewProjectDetails from "./tester/projectDetails";
import TesterAnnouncements from "./tester/viewAnnouncements";

import ManagerHome from "./manager/dashboard";
import ManagerCheck from "./manager/managerCheck";
import ManagerUpdateAccount from "./manager/updateAccount";
import ManagerViewMyProjects from "./manager/myProjects";
import MangerCreateProject from "./manager/createProject";
import ManagerViewProjectDetails from "./manager/projectDetails";
import ManagerViewProjectDevices from "./manager/AddDevices/projectDevices"
import ManagerBilling from "./manager/Billing/billing";
import ViewBugsDashboard from './bugs/bugsDashboard';
import ViewBug from './bugs/viewBug';
import EditBug from './bugs/editBug';
import CreateBug from './bugs/createBug';
import BugsInProjectDashboard from './bugs/bugsInProject';

import CreateTest from "../components/emulator/CreateTest/CreateTest";

//Create a Main Component
class Main extends Component {
	render() {
		return (
			<div>
				{/*Render Different Component based on Route*/}
				<Route path="/" component={Root} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/create-account" component={CreateAccount} />

				<Route path="/tester/" component={TesterCheck} />
				<Route path="/tester/dashboard" component={TesterHome} />
				<Route path="/tester/update-account" component={TesterUpdateAccount} />

				<Route path="/tester/project/all" component={TesterViewAllProjects} />
				<Route path="/tester/project/accepted" component={TesterViewAcceptedProjects} />
				<Route path="/tester/project/view/:projectId" component={TesterViewProjectDetails} />

				<Route path="/tester/announcements" component={TesterAnnouncements} />

				<Route exact path="/tester/bugs/all" component={ViewBugsDashboard} />
				<Route path="/tester/bugs/viewBug/:bugId" component={ViewBug} />
				<Route path="/tester/bugs/editBug/:bugId" component={EditBug} />
				<Route path="/tester/bugs/createBug" component={CreateBug} />
				<Route path="/tester/bugs/project/:projectId" component={BugsInProjectDashboard} />


				<Route path="/manager/" component={ManagerCheck} />
				<Route path="/manager/billing" component={ManagerBilling} />
				<Route path="/manager/dashboard" component={ManagerHome} />
				<Route path="/manager/update-account" component={ManagerUpdateAccount} />

				<Route path="/manager/project/all" component={ManagerViewMyProjects} />
				<Route path="/manager/project/new" component={MangerCreateProject} />
				<Route path="/manager/project/view/:projectId" component={ManagerViewProjectDetails} />
				<Route path="/manager/project/devices/:projectId" component={ManagerViewProjectDevices} />

				<Route exact path="/manager/bugs/all" component={ViewBugsDashboard} />
				<Route path="/manager/bugs/viewBug/:bugId" component={ViewBug} />
				<Route path="/manager/bugs/editBug/:bugId" component={EditBug} />
				<Route path="/manager/bugs/createBug" component={CreateBug} />
				<Route path="/manager/bugs/project/:projectId" component={BugsInProjectDashboard} />

				<Route path="/tester/createTest/emulator" component={CreateTest} />
			</div>
		);
	}
}
//Export The Main Component
export default Main;
