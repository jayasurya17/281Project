import React, { Component } from "react";
import { Route } from "react-router-dom";
import Root from "./root/root";
import Login from "./root/login";
import Logout from "./root/logout";
import CreateAccount from "./root/createAccount";

import AdminCheck from "./admin/adminCheck";
import AdminCreateAccount from "./admin/createAccount";
import AdminLogin from "./admin/login";
import AdminDashboard from "./admin/dashboard";
import AdminViewManagers from "./admin/viewManagers";
import AdminViewProjects from "./admin/viewProjects";
import AdminViewTesters from "./admin/viewTesters";

import TesterHome from "./tester/dashboard";
import TesterCheck from "./tester/testerCheck";
import TesterUpdateAccount from "./tester/updateAccount";
import TesterViewAllProjects from "./tester/viewAllProjects";
import TesterViewAcceptedProjects from "./tester/viewMyProjects";
import TesterViewProjectDetails from "./tester/projectDetails";
import TesterAnnouncements from "./tester/viewAnnouncements";
import TesterRunTest from "./tester/ViewProject/RunTest/runTest";
import TesterViewRuns from "./tester/ViewProject/ViewRuns/viewRuns";
import TesterViewRunDetails from "./tester/ViewProject/RunDetails/viewJobs";
import TesterViewRunArtifacts from "./tester/ViewProject/RunArtifacts/viewArtifacts";

import ManagerHome from "./manager/dashboard";
import ManagerCheck from "./manager/managerCheck";
import ManagerUpdateAccount from "./manager/updateAccount";
import ManagerViewMyProjects from "./manager/myProjects";
import MangerCreateProject from "./manager/createProject";
import ManagerdeleteProject from "./manager/deleteproject"
import ManagerViewProjectDetails from "./manager/projectDetails";
import ManagerViewProjectRuns from "./manager/ViewProject/ProjectDetails/viewRuns";
import ManagerViewProjectDevices from "./manager/AddDevices/projectDevices"
import ManagerBilling from "./manager/Billing/billing";
import ManagerViewRunDetails from "./manager/ViewProject/RunDetails/listJobs";
import ManagerViewRunArtifacts from "./manager/ViewProject/RunArtifacts/viewArtifacts";

import CreateTest from "../components/emulator/CreateTest/CreateTest";
import ViewEmulatorRuns from '../components/emulator/ViewTests/viewRuns'
import LandingPage from "./common/LandingPage/LandingPage";
import Emulators from "./emulator/Emulators";
import RunConfirmation from "./emulator/RunConfirmation/RunConfirmation";

//Create a Main Component
class Main extends Component {
	render() {
		return (
			<div>
				{/*Render Different Component based on Route*/}
				{/* <Route path="/" component={Root} /> */}
				<Route exact path="/" component={LandingPage} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/create-account" component={CreateAccount} />

				<Route path="/admin/" component={AdminCheck} />
				<Route path="/admin/create-account" component={AdminCreateAccount} />
				<Route path="/admin/login" component={AdminLogin} />
				<Route path="/admin/dashboard" component={AdminDashboard} />
				<Route path="/admin/managers" component={AdminViewManagers} />
				<Route path="/admin/projects" component={AdminViewProjects} />
				<Route path="/admin/testers" component={AdminViewTesters} />

				<Route path="/tester/" component={TesterCheck} />
				<Route path="/tester/dashboard" component={TesterHome} />
				<Route path="/tester/update-account" component={TesterUpdateAccount} />

				<Route path="/tester/project/all" component={TesterViewAllProjects} />
				<Route path="/tester/project/accepted" component={TesterViewAcceptedProjects} />
				<Route path="/tester/project/view/:projectId" component={TesterViewProjectDetails} />
				<Route path="/tester/project/run/schedule/:projectId" component={TesterRunTest} />
				<Route path="/tester/project/run/view/:projectId" component={TesterViewRuns} />
				<Route path="/tester/project/run/details/:projectId" component={TesterViewRunDetails} />
				<Route path="/tester/project/run/artifacts/:projectId" component={TesterViewRunArtifacts} />

				<Route path="/tester/project/run/emulator/:projectId" component={Emulators} />
				<Route path="/tester/project/run/viewTestRun" component={RunConfirmation} />
				<Route path="/tester/project/run/viewemulator/:projectId" component={ViewEmulatorRuns} />


				<Route path="/tester/announcements" component={TesterAnnouncements} />

				<Route path="/manager/" component={ManagerCheck} />
				<Route path="/manager/billing" component={ManagerBilling} />
				<Route path="/manager/dashboard" component={ManagerHome} />
				<Route path="/manager/update-account" component={ManagerUpdateAccount} />
				<Route path="/manager/project/all" component={ManagerViewMyProjects} />
				<Route path="/manager/project/new" component={MangerCreateProject} />
				<Route path="/manager/project/delete" component={ManagerdeleteProject} />
				<Route path="/manager/project/view/:projectId" component={ManagerViewProjectDetails} />
				<Route path="/manager/project/runs/:projectId" component={ManagerViewProjectRuns} />
				<Route path="/manager/project/run/details/:projectId" component={ManagerViewRunDetails} />
				<Route path="/manager/project/run/artifacts/:projectId" component={ManagerViewRunArtifacts} />
				<Route path="/manager/project/devices/:projectId" component={ManagerViewProjectDevices} />

			</div>
		);
	}
}
//Export The Main Component
export default Main;
