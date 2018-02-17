import React, { Component } from 'react';
import { Grid, Row, Col, Container } from 'react-grid-system';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 


import logo from '../logo/logo.png';
import AdminContent from './admin_content/admin_content';
import $ from "jquery";
import base64url from "base64url";

import './style.css';

const pageStyle = {
	font:'avenir'
}
const jumboStyle = {
	background:'#FFDC65',
	borderRadius:'25px',
	padding:'30px',
	paddingTop:'50px',
	paddingBottom:'40px',
	margin:'20px',
	font:'avenir'
}
const logoStyle = {
	width:'100%'
}
const adminStyle={
	borderRadius:'25px',
	padding:'10px',
	marginTop:'15px',
	background:'white',
	paddingLeft:'13px',
	color:'#FFDC65',
}
const headStyle={
	background:'black',
	margin:'20px 20px 5px 20px',
	color:'#eaeaea',
	padding:'10px',
	borderRadius:'25px',
	font:'avenir',
	paddingLeft:'20px',
	paddingRight:'20px',
}
class AdminPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}
	componentWillMount() {
		const token = `Bearer ${localStorage.getItem("access_token")}`;
		const hash = window.location.hash || null;
		console.log('admin_panel hash', hash);
		console.log('token', token)
		const header = JSON.stringify(
			{
			    "typ": "JWT",
			    "alg": "HS256"
			}
		);
		const payload = JSON.stringify(
			{
			    "access_token": token
			}
		);
		let data = base64url( header ) + "." + base64url( payload );
		console.log('data', data);

		
		const settings = {
			"async": true,
			"crossDomain": true,
			"url": "/admin/all-tags",
			"method": "GET",
			"headers": {
			"Authorization": token
			}
		}

		$.ajax(settings).done(response => {
			let testArray = response.splice(0,10)
			this.setState({tags: testArray})
		});
	}
	removeTheThing(tagName) {
		const { tags } = this.state;
		this.setState({
			tags: tags.filter(tag => tag.tag_name !== tagName)
		})
	}

  render() {
	const tagList = this.state.tags && this.state.tags.map(tag => {
		return (
			<AdminContent
				key={tag.tag_name}
				tagName={tag.tag_name}
				datePosted={Date.now()}
				onRemove={() => {
					this.removeTheThing(tag.tag_name)}}
			/>
		)
	})

    return (
      <Container style={ pageStyle }>
    	<Row style={ jumboStyle }>
    		<Col md= { 7 } lg= { 4 }>
    			<img className='logo' src={logo} style={logoStyle} />
    		</Col>
    		<Col md= { 5 } lg= { 4 } style={{textAlign:'center'}}>
    			<h2 style={ adminStyle }>admin page</h2>
    		</Col>
    	</Row>
    	<Row style={ headStyle }>
			<Col xs={ 4 }>
				<b>Tag:</b>
			</Col>
			<Col xs={ 4 }>
				<b>Date Posted:</b>
			</Col>
			<Col xs={ 4 }>
				<b>Approve:</b>
			</Col>
		</Row>
    	<Row style={{marginLeft:'20px', marginRight:'20px'}}>
			<ReactCSSTransitionGroup
				transitionName="example"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				style={{width: '100%'}}>
					{ tagList }
			</ReactCSSTransitionGroup>
    	</Row>
      </Container>
    );
  }
}

export default AdminPanel;