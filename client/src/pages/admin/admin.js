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
		console.log('isAuthenticated() called =', this.props.auth.isAuthenticated());
		return this.props.auth.isAuthenticated();
	}

	componentWillMount() {
		console.log('componentWillMount()called');
		console.log("(!this.isAuthenticated())", (!this.isAuthenticated()));
		if (!this.isAuthenticated()){
			this.login();
		} else {
			result = (<AdminPanel auth={this.props.auth}/>)
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
