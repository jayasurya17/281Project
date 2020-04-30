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