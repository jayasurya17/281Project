import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Card, CardBody, Fade, CardFooter, CardHeader, CardText, CardTitle, Jumbotron, Container } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './AllProjects.css';
import axios from 'axios';
import Constants from '../../../utils/constants';
let name, shortDes, detDesc, compName, address, city, state, zip, testCases, tech, modal = false, fadeIn = false, Collapse
let allProjCards = null


class AllProjects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allProjCards: []
		}
	}

	componentDidMount() {
		axios.get(`${Constants.BACKEND_SERVER.URL}/manager/allProjects/${localStorage.getItem('281UserId')}`)
			.then((response) => {
				console.log('allProjs response', response.data)
				if (response.data != null) {

					var projectCards = [],
						item
					for (var index in response.data) {
						item = response.data[index]
						// console.log(item)
						projectCards.push(
							<Card className="card">
								<CardHeader>{item['name']}</CardHeader>
								<CardBody>
									<CardTitle><b>About</b> {item['shortDescription']}</CardTitle>
									<CardText><b>Technologies</b> {item['technologies']}</CardText>
									<CardText><b>Detailed Description</b> {item['detailedDescription']}</CardText>
									<CardText><b>Company Name</b> {item['companyName']}</CardText>
									<CardText><b>Address</b> {item['address']}</CardText>
									<CardText><b>City</b> {item['city']}</CardText>
									<CardText><b>State</b> {item['state']}</CardText>
									<CardText><b>Zipcode</b> {item['zip']}</CardText>
									<CardText><b>TestCases</b> {item['testCases']}</CardText>
									{/* <CardText><b>Working Testers</b> {item['testers_involved'].join()}</CardText> */}
									<Button className="btn" color="danger" onClick={ this.remove.bind(this, item['name']) }>Remove</Button>
								</CardBody>
							</Card>
						)
					}

					this.setState({
						allProjCards: projectCards
					})
				}
			})
			.catch(() => { console.log("error") })

	}

	remove = (name) => {
		alert('This will delete Project entry, S3 space, related bugs')
		let data = { projectname: name }
		console.log('Project Removal Manager: ')
		console.log(data)
		axios.post(':3001/admin/deleteProject', data)
			//axios.post(hostedAddress+'/admin/deleteProject',data)
			.then((response) => {
				console.log('deleted', response.data)
				window.location.reload()
			})
			.catch(() => { console.log("error") })
	}
	render() {
		return (
			<div className="mainDiv">
				<div className="navDiv">
				</div>
				<div style={{ marginTop: "1%" }}>
					{/* <Jumbotron>
						<Container>
							<span style={{ marginLeft: "2px" }}> <h4 className="display-4">My Projects</h4></span>
							<span class="right-button"><a href="/addProject"> <Button color="danger"> Add</Button></a></span>
						</Container>
					</Jumbotron> */}
					<div>
						<div class="card-arrange">
							<Container>
								{ this.state.allProjCards }
							</Container>
						</div>
					</div>
				</div>
			</div>
		);
	}
}




export default AllProjects;