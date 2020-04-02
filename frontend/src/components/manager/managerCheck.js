import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Logout extends Component {
	render() {
        let RedirectVar
        if (localStorage.getItem('281UserType') === "Tester") {
            RedirectVar = <Redirect to="/tester/home" />;
        } else if (localStorage.getItem('281UserType') === "Admin") {
            RedirectVar = <Redirect to="/admin/home" />;
        } 
		return (
			<div>
				{RedirectVar}
			</div>
		);
	}
}
// export Logout Component
export default Logout;
