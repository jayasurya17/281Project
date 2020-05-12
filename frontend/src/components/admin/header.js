import React, { Component } from 'react';
import logo from '../../../src/Assets/Icons/Logo.png'

class Header extends Component {

    render() {

        return (
            <div>
                <div class="row">
                    <div class="col-md-10">
                        <a href="/" class=" headerLogo text-dark text-decoration-none" style={{ display: 'flex' }}>
                            <img src={logo} style={{ height: '90px' }} alt="logo"/>
                            <h1 class="display-4 text-break ">Mobile TaaS</h1>
                        </a>
                    </div>
                    <div class="col-md-2 pt-4">
                        <p class="text-break">Hello, {localStorage.getItem('281Username')}</p>
                    </div>
                </div>
            </div>
        )
    }
}
//export Header Component
export default Header;