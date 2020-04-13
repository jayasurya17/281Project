import React, {Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import AddProject2 from './AddProject/AddProject2';

class Landing extends Component {

    render(){

        return(
            <div>
    
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />
                    
                    <AddProject2 />
                    
                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;