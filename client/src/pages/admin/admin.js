import React, { Component } from 'react';
import {Router, Route} from "react-router-dom"
import Logo from '../../components/logo/logo';
import TagSearch from '../../components/tag_search/tag_search';
import Trending from '../../components/trending/trending';
import AdminPanel from "../../components/admin_panel/admin_panel.js";

var result = (<span />); 
class Admin extends Component {
	login() {
		return this.props.auth.login();
	}

	isAuthenticated() {
		return this.props.auth.isAuthenticated();
	}

	componentWillMount() {
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
