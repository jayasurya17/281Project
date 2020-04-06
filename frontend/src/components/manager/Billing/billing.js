import React, {Component} from 'react';
import Header from '../../common/header';
import Footer from '../../common/footer';
import Navigation from '../../common/navigation';

class Landing extends Component {

    render(){

        return(
            <div>
    
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    {/* Component design goes here */}
                    <p className="display-4">Show costs based on resource utilization categorized by projects.</p> 
                    
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;