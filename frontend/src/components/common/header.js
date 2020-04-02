import React, {Component} from 'react';

class Header extends Component {

    render(){

        var display;
        if (window.location.pathname === '/login' || window.location.pathname === '/create-account') {
            display = "";
        } else if (localStorage.getItem('281UserType') === "Manager") {
            display = [       
                <div class="col-md-2 pt-4">
                    <p class="text-break">Hello, { localStorage.getItem('281Username') }</p>
                    <a href="/manager/update-account">
                        <button class="btn btn-outline-dark">Update my profile</button>
                    </a>
                </div>
            ]
        } else if (localStorage.getItem('281UserType') === "Tester") {
            display = [       
                <div class="col-md-2 pt-4">
                    <p class="text-break">Hello, { localStorage.getItem('281Username') }</p>
                    <a href="/tester/update-account">
                        <button class="btn btn-outline-dark">Update my profile</button>
                    </a>
                </div>
            ]
        } else {
            display = [       
                <div class="col-md-2 pt-4">
                    <a href="/login">
                        <button class="btn btn-link">Login</button>
                    </a>
                    <span>(or)</span>
                    <a href="/create-account">
                        <button class="btn btn-outline-dark">Create account</button>
                    </a>
                </div>
            ]
        }

        return(    
            <div>
                <div class="row">
                    <div class="col-md-10">
                        <h1 class="display-1 text-break font-weight-bolder"><a href="/" class="text-dark text-decoration-none">Device Farm</a></h1>
                    </div>
                    { display }
                    {/* { loginText } */}
                </div>
            </div>
        )
    }
}
//export Header Component
export default Header;