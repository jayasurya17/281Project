import React, {Component} from 'react';

class Home extends Component {

    render(){
        let logoutUser
        if (localStorage.getItem('281UserId')) {
            logoutUser = <p>Not { localStorage.getItem('281Username') }? <a href="/logout">Logout</a></p>
        }
        return(               
            <div class="row mt-5 border-top">
                <div class="col-6">
                    <h1><a href="https://github.com/aswinpchn/NewsPaper" target="_blank" rel="noopener noreferrer" class="text-dark">281 Project</a></h1>
                    { logoutUser }
                </div>
                <div class="col-6">
                    <div class="row">
                        <div class="col-md-6">© Jayasurya Pinaki</div>
                        <div class="col-md-6">014491854</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-6">© Nihanjali Mallavarapu</div>
                        <div class="col-md-6">014492933</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-6">© Vamsi Krishna Chakravartula</div>
                        <div class="col-md-6">014488487</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-6">© Vasanthi Amoolya Koduri</div>
                        <div class="col-md-6">014533649</div>
                    </div> 
                    <div class="row">
                        <div class="col-md-6">© Venkata Sai Srihari Duvvuri</div>
                        <div class="col-md-6">014533571</div>
                    </div> 
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;