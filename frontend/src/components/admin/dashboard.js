import React, { Component } from 'react';
import Header from './header';
import Navbar from './navigation';
import Footer from '../common/footer';

class Home extends Component {

    render() {

        return (
            <div class="bg-white p-5">
                <Header />
                <Navbar />
                
                A graph with all different types of users are displayed

                <Footer />
            </div>
        )
    }
}
//export Home Component
export default Home;