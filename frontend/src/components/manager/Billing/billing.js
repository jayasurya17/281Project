import React, {Component} from 'react';
import Header from '../../common/header';
import Footer from '../../common/footer';
import Navigation from '../../common/navigation';
import logo1 from './compute.jpg'
import logo2 from './storage.jpg'
import logo3 from './emulator.jpg'
import logo4 from './devicefarm.jpg'
import logo5 from './mtaas.jpg'
import logo6 from './tax.jpg'
import Table from 'react-bootstrap/Table'



import { Card, CardBody, CardHeader, CardText, CardTitle, Container, CardImg } from 'reactstrap';

// import GenerateBill from './generateBill';

class Landing extends Component {

    render(){

        return(
            <div>
    
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    <div class="card-arrange">
							<Container>
                            <Card className="card">
                            <CardImg top width="100%" src={logo1} alt="Card image cap" />

								<CardHeader>Computation Pricing</CardHeader>

								<CardBody>
									<CardTitle><b>Base Price:</b> 3 Dollars </CardTitle>
									<CardText><b>Compute Power</b> 1 GB Ram</CardText>
                                    </CardBody>
							</Card>
                            <Card className="card">
                            <CardImg top width="100%" src={logo2} alt="Card image cap" />

								<CardHeader>Storage Cost</CardHeader>
								<CardBody>
									<CardTitle><b>Base Price:</b> 50 cents </CardTitle>
									<CardText><b>Price per File</b> 15 cents</CardText>
                                    </CardBody>
							</Card>
                            <Card className="card">
                            <CardImg top width="100%" src={logo3} alt="Card image cap" />

								<CardHeader>Emulator Pricing</CardHeader>
								<CardBody>
									<CardTitle><b>Base Price:</b> 20 Cents </CardTitle>
									<CardText><b>Cost for each emulator run</b> 50 Cents</CardText>
                                    </CardBody>
							</Card>
                            <Card className="card">
                            <CardImg top width="100%" src={logo4} alt="Card image cap" />

								<CardHeader>Device Farm Pricing</CardHeader>
								<CardBody>
									<CardTitle><b>Base Price:</b> 60 Cents </CardTitle>
									<CardText><b>Price per minute</b> 10 Cents</CardText>
                                    <CardText><b>Price per device</b> 15 Cents</CardText>
                                    </CardBody>
							</Card>
                            <Card className="card">
                            <CardImg top width="100%" src={logo5} alt="Card image cap" />

								<CardHeader>Mobile Taas Service Price</CardHeader>
								<CardBody>
									<CardTitle><b>Base Price:</b> 5 Dollars </CardTitle>
									
                                    </CardBody>
							</Card>
                            <Card className="card">
                            <CardImg top width="100%" src={logo6} alt="Card image cap" />

								<CardHeader>Network Prices and Tax</CardHeader>
								<CardBody>
									<CardTitle><b>Network and Infrastructure Price:</b> 2 Dollars </CardTitle>
									<CardText><b>Tax Pricing</b>:  1.3 Dollars</CardText>
                                    </CardBody>
							</Card>
        {/* <Table striped bordered hover>
<thead>
<tr>
<th>#</th>
<th>First Name</th>
<th>Last Name</th>
<th>Username</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
</tr>
<tr>
<td>2</td>
<td>Jacob</td>
<td>Thornton</td>
<td>@fat</td>
</tr>
<tr>
<td>3</td>
<td colSpan="2">Larry the Bird</td>
<td>@twitter</td>
</tr>
</tbody>
</Table> */}
                            
                            </Container>
						</div>
       
                    <div className="row pt-5">
                        <div className="col-md-3 offset-md-8">
                            <a href="/manager/view/bill" target="_blank">
                                <button className="btn btn-warning">View printer friendly page</button>
                            </a>
                        </div>
                    </div>
                    {/* https://reactjs.org/docs/dom-elements.html#style */}
                    {/* <GenerateBill /> */}
                    
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;