import React, { Component } from 'react';
import DashboardCard from '../../common/Dashboard/card';

class Home extends Component {

    render() {

        return (
            <div>
                
                <div className="row mt-5">
                    <div className="col-md-4">
                        <DashboardCard heading="Test cases passed" count="5" background="bg-success" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Test cases failed" count="7" background="bg-danger" />
                    </div>
                    <div className="col-md-4">
                        <DashboardCard heading="Bugs reported" count="9" background="bg-warning" />
                    </div>
                </div>
                
                <div className="row mt-5">
                    <div className="col-md-3">
                        <DashboardCard heading="Pre booked real devices" count="0" background="bg-success" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Devices being used on-demand" count="17" background="bg-secondary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Active runs on real devices" count="0" background="bg-primary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Completed runs real devices" count="14" background="bg-warning" />
                    </div>
                </div>
                
                <div className="row mt-5 mb-5">
                    <div className="col-md-3">
                        <DashboardCard heading="Pre booked simulators" count="0" background="bg-success" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Simulators being used on-demand" count="2" background="bg-secondary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Active runs on simulators" count="0" background="bg-primary" />
                    </div>
                    <div className="col-md-3">
                        <DashboardCard heading="Completed runs simulators" count="3" background="bg-warning" />
                    </div>
                </div>

            </div>
        )
    }
}
//export Home Component
export default Home;