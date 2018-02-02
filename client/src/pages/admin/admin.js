import React, { Component } from 'react';
import {Router, Route} from "react-router-dom"
import Logo from '../../components/logo/logo';
import TagSearch from '../../components/tag_search/tag_search';
import Trending from '../../components/trending/trending';
import AdminPanel from "../../components/admin_panel/admin_panel.js";

var result = (<h3>FAIL</h3>); 
class Admin extends Component {
	login() {
		this.props.auth.login();
	}

	isAuthenticated() {
		this.props.auth.isAuthenticated();
	}

	componentWillMount() {
		if (! this.isAuthenticated()){
			return this.login();
		} else {
			result = (<AdminPanel />)
		}
	}

	render() {
		return (
			<div className="container">
				{result}
			</div>
			)
		}

}

export default Admin;

// class Home extends Component {
//   login() {
// 	this.props.auth.login();
//   }
//   render() {
// 	const { isAuthenticated } = this.props.auth;
// 	return (
// 	  <div className="container">
// 		{
// 		  isAuthenticated() && (
// 			  <h4>
// 				You are logged in!
// 			  </h4>
// 			)
// 		}
// 		{
// 		  !isAuthenticated() && (
// 			  <h4>
// 				You are not logged in! Please{' '}
// 				<a
// 				  style={{ cursor: 'pointer' }}
// 				  onClick={this.login.bind(this)}
// 				>
// 				  Log In
// 				</a>
// 				{' '}to continue.
// 			  </h4>
// 			)
// 		}
// 	  </div>
// 	);
//   }
// }