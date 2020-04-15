import React, { Component } from 'react';
import Header from './header';
import Navbar from './navigation';
import Footer from '../common/footer';
import DashboardCard from '../common/Dashboard/card';

class Home extends Component {

    render() {

        return (
            <div class="bg-white pl-5 pr-5">
                <Header />
                <Navbar />
                
                <div className="row mt-5">
                    <div className="col-md-4">
                        <DashboardCard heading="Number of managers" count="5" background="bg-info" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Number of testers" count="7" background="bg-warning" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Number of projects" count="9" background="bg-success" />
                    </div>
                </div>
                
                <div className="row mt-5">
                    <div className="col-md-3">
                        <DashboardCard heading="Pre booked real devices" count="5" background="bg-primary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Devices being used on-demand" count="7" background="bg-secondary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Active runs on real devices" count="9" background="bg-warning" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Completed runs real devices" count="9" background="bg-success" />
                    </div>
                </div>
                
                <div className="row mt-5 mb-5">
                    <div className="col-md-3">
                        <DashboardCard heading="Pre booked simulators by managers" count="5" background="bg-primary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Simulators being used on-demand" count="7" background="bg-secondary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Active runs on simulators" count="9" background="bg-warning" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Completed runs simulators" count="9" background="bg-success" />
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}
//export Home Component
export default Home;