import React, {Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';

class Landing extends Component {

    render(){

        return(
            <div>
    
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    <p class="display-4">LIST OF MY PROJECTS</p>
                    <h3>Project 1</h3>
                    <h3>Project 2</h3>
                    <h3>Project 3</h3>
                    <h3>Project 4</h3>
                    <h3>Project 5</h3>
                    <h3>Project 6</h3>
                    
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;